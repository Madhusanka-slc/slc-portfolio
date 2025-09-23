import React, { useState, useRef, useEffect } from "react";
import NavLink from "./NavLink";
import { scroller } from "react-scroll";
import { askPortfolioAgent } from "../agent/portfolioAgent";
import { allProjects } from "../data/projectsData";
import { allExperiences } from "../data/experiencesData";
import { allBlogs } from "../data/blogsData";
import VoiceButton from "./VoiceButton";
import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';

const Header = ({
  setCurrentPage,
  currentPage,
  projectRefs,
  blogRefs,
  experienceRefs,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const deepgramConnectionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const hasSpokenRef = useRef(false);
  const lastTranscriptRef = useRef("");
  const conversationHistoryRef = useRef([]);
  const audioContextRef = useRef(null);
  const currentAudioRef = useRef(null);
  const listenTimeoutRef = useRef(null); // New ref for the timeout

  const cancelSpeech = () => {
    isSpeakingRef.current = false;
    speechSynthesis.cancel();

    // Stop any playing Deepgram TTS audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current.src = ''; // Clear the source to release blob
      currentAudioRef.current = null;
    }
  };

  // Enhanced function to use Deepgram TTS
  const speakWithDeepgram = async (text) => {
    try {
      const deepgramKey = await getDeepgramToken();
      if (!deepgramKey) {
        console.log("No Deepgram key, falling back to browser TTS");
        return speakAsync(text);
      }

      const response = await fetch('https://api.deepgram.com/v1/speak?model=aura-orpheus-en', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${deepgramKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
        }),
      });

      if (!response.ok) {
        console.log("Deepgram TTS failed, falling back to browser TTS");
        return speakAsync(text);
      }

      const audioBlob = await response.blob();

      return new Promise((resolve, reject) => {
        const audio = new Audio();
        currentAudioRef.current = audio;

        // Set up event listeners before setting src
        audio.onloadeddata = () => {
          console.log("Audio data loaded successfully");
        };

        audio.onended = () => {
          console.log("Audio playback ended");
          currentAudioRef.current = null;
          resolve();
        };

        audio.onerror = (error) => {
          console.log("Audio playback failed, falling back to browser TTS:", error);
          currentAudioRef.current = null;
          speakAsync(text).then(resolve).catch(reject);
        };

        audio.oncanplay = () => {
          // Only play once we're sure the audio can play
          audio.play().catch(error => {
            console.log("Audio play failed, falling back to browser TTS:", error);
            currentAudioRef.current = null;
            speakAsync(text).then(resolve).catch(reject);
          });
        };

        // Create blob URL and set as source
        const audioUrl = URL.createObjectURL(audioBlob);
        audio.src = audioUrl;

        // Clean up blob URL after audio ends or errors
        const cleanup = () => {
          setTimeout(() => {
            URL.revokeObjectURL(audioUrl);
          }, 2000); // Small delay to ensure cleanup after playback
        };

        audio.addEventListener('ended', cleanup, { once: true });
        audio.addEventListener('error', cleanup, { once: true });

        // Load the audio
        audio.load();
      });
    } catch (error) {
      console.log("Deepgram TTS error, falling back to browser TTS:", error);
      return speakAsync(text);
    }
  };

  // Fallback to browser speech synthesis
  const speakAsync = (text) =>
    new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = resolve;
      speechSynthesis.speak(utterance);
    });

  useEffect(() => {
    if (!hasSpokenRef.current) {
      const introText =
        "Hi! I'm your portfolio assistant. I can help you explore projects, experiences, and blog posts through voice commands. Ask me about anything you'd like to know!";
      isSpeakingRef.current = true;
      speakWithDeepgram(introText).then(() => {
        isSpeakingRef.current = false;
        // Start listening after the intro is done
        startListening();
      });
      hasSpokenRef.current = true;
    }
  }, []);

  const processFullTranscript = async () => {
    const finalTranscript = lastTranscriptRef.current.trim();
    if (!finalTranscript || isSpeakingRef.current) {
      lastTranscriptRef.current = "";
      return;
    }

    // Stop listening before processing
    await stopListening();

    console.log("Processing final transcript:", finalTranscript);
    isSpeakingRef.current = true;

    lastTranscriptRef.current = "";

    const newMessages = [...conversationHistoryRef.current, { role: "user", content: finalTranscript }];

    try {
      const response = await askPortfolioAgent(finalTranscript, newMessages);
      console.log("========== Voice Agent DEBUG ==========");
      console.log("Full Response Object:", response);

      conversationHistoryRef.current = [...newMessages, { role: "assistant", content: JSON.stringify(response) }];

      if (conversationHistoryRef.current.length > 6) {
        conversationHistoryRef.current = conversationHistoryRef.current.slice(conversationHistoryRef.current.length - 6);
      }

      if (!response?.steps?.length && response.start.includes("I usually focus on")) {
        await speakWithDeepgram(response.start);
        return;
      }

      if (response.start && isSpeakingRef.current) {
        await speakWithDeepgram(response.start);
      }

      for (const step of response.steps || []) {
        if (!isSpeakingRef.current) break;

        let targetKey = null;

        const normalize = (str) =>
          str.toLowerCase().replace(/\s+/g, " ").trim();

        switch (step.category) {
          case "project": {
            const project = allProjects.find(
              (p) => normalize(p.title) === normalize(step.title)
            );
            if (project) {
              targetKey = `project-${project.id}`;
              if (currentPage !== "projects") {
                setCurrentPage("projects");
                await new Promise((r) => setTimeout(r, 500));
              }
            }
            break;
          }
          case "blog": {
            const blog = allBlogs.find(
              (b) => normalize(b.title) === normalize(step.title)
            );
            if (blog) {
              targetKey = `blog-${blog.id}`;
              if (currentPage !== "blog") {
                setCurrentPage("blog");
                await new Promise((r) => setTimeout(r, 500));
              }
            }
            break;
          }
          case "experience": {
            const exp = allExperiences.find(
              (e) => normalize(e.title) === normalize(step.title)
            );
            if (exp) {
              targetKey = `experience-${exp.id}`;
              if (currentPage !== "experience") {
                setCurrentPage("experience");
                await new Promise((r) => setTimeout(r, 500));
              }
            }
            break;
          }
        }

        if (targetKey) {
          scroller.scrollTo(targetKey, {
            duration: 800,
            smooth: true,
            offset: -100,
          });
          await new Promise((r) => setTimeout(r, 300));
        }

        if (!isSpeakingRef.current) break;

        if (step.introduction)
          await speakWithDeepgram(step.introduction);
        if (!isSpeakingRef.current) break;
        if (step.description)
          await speakWithDeepgram(step.description);
      }

      if (response.end && isSpeakingRef.current) {
        await speakWithDeepgram(response.end);
      }
    } catch (err) {
      console.error("Voice agent error:", err);
      if (isSpeakingRef.current)
        await speakWithDeepgram("Sorry, I could not understand that.");
    } finally {
      isSpeakingRef.current = false;
      // Restart listening after the response is complete
      startListening();
    }
  };

  const getDeepgramToken = async () => {
    try {
      const response = await fetch('/api/deepgram');
      if (response.ok) {
        const data = await response.json();
        return data.token;
      }
    } catch (error) {
      console.log('API route not available, using client key for development.');
    }
    return import.meta.env.VITE_DEEPGRAM_KEY;
  };

  const connectToDeepgram = async () => {
    if (isConnecting || isListening) {
      console.log("Already active, skipping new connection...");
      return;
    }
    setIsConnecting(true);
    console.log("Starting Deepgram connection...");
    try {
      await stopListening();
      const deepgramKey = await getDeepgramToken();
      if (!deepgramKey) {
        throw new Error("Deepgram API key not found");
      }
      const deepgram = createClient(deepgramKey);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      const connection = deepgram.listen.live({
        model: 'nova-2',
        interim_results: true,
        smart_format: true,
        language: 'en-US',
        utterance_end_ms: 1000,
      });
      deepgramConnectionRef.current = connection;
      connection.on(LiveTranscriptionEvents.Open, () => {
        console.log("✅ Deepgram connection opened.");
        setIsListening(true);
        setIsConnecting(false);
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0 && connection.getReadyState() === 1 && !isSpeakingRef.current) {
            connection.send(event.data);
          }
        };
        mediaRecorder.start(100);
      });
      connection.on(LiveTranscriptionEvents.Close, (event) => {
        console.log("🔌 Deepgram connection closed:", event);
        setIsListening(false);
        setIsConnecting(false);
      });
      connection.on(LiveTranscriptionEvents.Error, (error) => {
        console.error("❌ Deepgram error:", error);
        setIsListening(false);
        setIsConnecting(false);
        speakWithDeepgram("Sorry, a connection error occurred.");
      });
      connection.on(LiveTranscriptionEvents.Transcript, (data) => {
        const transcript = data.channel.alternatives[0].transcript;
        if (data.is_final) {
          console.log("Final part received, accumulating:", transcript);
          lastTranscriptRef.current += transcript + " ";
        }
      });
      connection.on(LiveTranscriptionEvents.UtteranceEnd, () => {
        console.log("Utterance ended. Processing full sentence.");
        if (!isSpeakingRef.current) {
          processFullTranscript();
        }
      });
    } catch (error) {
      console.error("❌ Error connecting to Deepgram:", error);
      setIsListening(false);
      setIsConnecting(false);
      speakWithDeepgram("Sorry, I couldn't access your microphone or connect to the speech service.");
    }
  };

  const stopListening = async () => {
    console.log("Stopping listening...");
    clearTimeout(listenTimeoutRef.current);
    cancelSpeech();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    mediaRecorderRef.current = null;
    if (deepgramConnectionRef.current) {
      deepgramConnectionRef.current.finish();
      deepgramConnectionRef.current = null;
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }
    setIsListening(false);
    setIsConnecting(false);
    console.log("Listening stopped completely");
  };

  const startListening = async () => {
    // Clear any existing timeout to prevent multiple connections
    clearTimeout(listenTimeoutRef.current);

    if (isListening) {
      await stopListening();
      return;
    }
    console.log("Starting voice recognition...");
    cancelSpeech();
    await connectToDeepgram();

    // Start a timeout to check for silence and reconnect if needed
    // This provides a continuous listening experience
    listenTimeoutRef.current = setTimeout(() => {
        if (isListening && !isSpeakingRef.current) {
          console.log("1-minute silence detected, restarting connection for continuous conversation...");
          stopListening().then(connectToDeepgram);
        }
      }, 60000); // 1 minute in milliseconds
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 py-4 bg-[#1d1e20]">
      <div className="flex flex-col md:flex-row md:justify-around items-center space-y-2 md:space-y-0">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setCurrentPage("home")}
        >
          <h1 className="text-lg sm:text-xl font-bold text-gray-500">
            Portfolio
          </h1>
          <VoiceButton
            isListening={isListening}
            isConnecting={isConnecting}
            startListening={startListening}
            stopListening={stopListening}
            waveformStyle="smooth"
          />
        </div>
        <nav className="flex justify-center md:justify-start space-x-6 text-base font-medium w-full md:w-auto">
          <NavLink
            onClick={() => setCurrentPage("home")}
            isActive={currentPage === "home"}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setCurrentPage("blog")}
            isActive={currentPage === "blog"}
          >
            Blog
          </NavLink>
          <NavLink
            onClick={() => setCurrentPage("projects")}
            isActive={currentPage === "projects"}
          >
            Projects
          </NavLink>
          <NavLink
            onClick={() => setCurrentPage("experience")}
            isActive={currentPage === "experience"}
          >
            Experience
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;