// Header.jsx

import React, { useState, useRef, useEffect } from "react";
import NavLink from "./NavLink";
import { scroller } from "react-scroll";
import { askPortfolioAgent } from "../agent/portfolioAgent";
import { allProjects } from "../data/projectsData";
import { allExperiences } from "../data/experiencesData";
import { allBlogs } from "../data/blogsData";
import VoiceButton from "./VoiceButton";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";

const Header = ({
  setCurrentPage,
  currentPage,
  projectRefs,
  blogRefs,
  experienceRefs,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isPlayingIntro, setIsPlayingIntro] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Add processing state
  const deepgramConnectionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const hasSpokenRef = useRef(false);
  const lastTranscriptRef = useRef("");
  const conversationHistoryRef = useRef([]);
  const audioContextRef = useRef(null);
  const currentAudioRef = useRef(null);
  const listenTimeoutRef = useRef(null);

  const cancelSpeech = () => {
    isSpeakingRef.current = false;
    speechSynthesis.cancel();

    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current.src = "";
      currentAudioRef.current = null;
    }
  };

  const speakWithDeepgram = async (text) => {
    try {
      const deepgramKey = await getDeepgramToken();
      if (!deepgramKey) {
        console.log("No Deepgram key, falling back to browser TTS");
        return speakAsync(text);
      }

      const response = await fetch(
        "https://api.deepgram.com/v1/speak?model=aura-orpheus-en",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${deepgramKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
          }),
        }
      );

      if (!response.ok) {
        console.log("Deepgram TTS failed, falling back to browser TTS");
        return speakAsync(text);
      }

      const audioBlob = await response.blob();

      return new Promise((resolve, reject) => {
        const audio = new Audio();
        currentAudioRef.current = audio;

        audio.onloadeddata = () => {
          console.log("Audio data loaded successfully");
        };

        audio.onended = () => {
          console.log("Audio playback ended");
          currentAudioRef.current = null;
          resolve();
        };

        audio.onerror = (error) => {
          console.log(
            "Audio playback failed, falling back to browser TTS:",
            error
          );
          currentAudioRef.current = null;
          speakAsync(text).then(resolve).catch(reject);
        };

        audio.oncanplay = () => {
          audio.play().catch((error) => {
            console.log(
              "Audio play failed, falling back to browser TTS:",
              error
            );
            currentAudioRef.current = null;
            speakAsync(text).then(resolve).catch(reject);
          });
        };

        const audioUrl = URL.createObjectURL(audioBlob);
        audio.src = audioUrl;

        const cleanup = () => {
          setTimeout(() => {
            URL.revokeObjectURL(audioUrl);
          }, 2000);
        };

        audio.addEventListener("ended", cleanup, { once: true });
        audio.addEventListener("error", cleanup, { once: true });

        audio.load();
      });
    } catch (error) {
      console.log("Deepgram TTS error, falling back to browser TTS:", error);
      return speakAsync(text);
    }
  };

  const speakAsync = (text) =>
    new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = resolve;
      speechSynthesis.speak(utterance);
    });

  const playIntroduction = async () => {
    const introText =
      "Hi! I'm your portfolio assistant. I can help you explore projects, experiences, and blog posts through voice commands. Ask me about anything you'd like to know!";

    setIsPlayingIntro(true);
    isSpeakingRef.current = true;

    try {
      await speakWithDeepgram(introText);
    } catch (error) {
      console.error("Error playing introduction:", error);
    } finally {
      isSpeakingRef.current = false;
      setIsPlayingIntro(false);
      hasSpokenRef.current = true;
      // Start listening after intro is complete
      await connectToDeepgram();
    }
  };

  const processFullTranscript = async () => {
    const finalTranscript = lastTranscriptRef.current.trim();
    if (!finalTranscript || isSpeakingRef.current) {
      lastTranscriptRef.current = "";
      return;
    }

    // Direct check for farewell keywords before anything else
    const farewellKeywords = [
      "bye",
      "goodbye",
      "later",
      "thanks",
      "thank you",
      "stop",
      "finish",
      "end",
    ];
    const isFarewell = farewellKeywords.some((keyword) =>
      finalTranscript.toLowerCase().includes(keyword)
    );

    if (isFarewell) {
      console.log("Farewell detected. Stopping conversation.");
      await speakWithDeepgram("You're welcome! Bye for now.");
      await stopListening();
      lastTranscriptRef.current = "";
      return;
    }

    // Stop listening before processing
    await stopListening();

    console.log("Processing final transcript:", finalTranscript);
    setIsProcessing(true); // Start processing - shows yellow spinner
    isSpeakingRef.current = true;
    lastTranscriptRef.current = "";

    const newMessages = [
      ...conversationHistoryRef.current,
      { role: "user", content: finalTranscript },
    ];

    try {
      const response = await askPortfolioAgent(finalTranscript, newMessages);
      console.log("========== Voice Agent DEBUG ==========");
      console.log("Full Response Object:", response);

      conversationHistoryRef.current = [
        ...newMessages,
        { role: "assistant", content: JSON.stringify(response) },
      ];

      if (conversationHistoryRef.current.length > 6) {
        conversationHistoryRef.current = conversationHistoryRef.current.slice(
          conversationHistoryRef.current.length - 6
        );
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
            if (step.targetKey) {
              targetKey = step.targetKey;
              if (currentPage !== "projects") {
                setCurrentPage("projects");
                await new Promise((r) => setTimeout(r, 500));
              }
            }
            break;
          }

          case "blog": {
            if (step.targetKey) {
              targetKey = step.targetKey;
              if (currentPage !== "blog") {
                setCurrentPage("blog");
                await new Promise((r) => setTimeout(r, 500));
              }
            }
            break;
          }

          case "experience": {
            if (step.targetKey) {
              targetKey = step.targetKey;
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

        if (step.introduction) await speakWithDeepgram(step.introduction);
        if (!isSpeakingRef.current) break;
        if (step.description) await speakWithDeepgram(step.description);
      }

      if (response.end && isSpeakingRef.current) {
        await speakWithDeepgram(response.end);
      }
    } catch (err) {
      console.error("Voice agent error:", err);
      setIsProcessing(false); // Clear processing state on error
      if (isSpeakingRef.current)
        await speakWithDeepgram("Sorry, I could not understand that.");
    } finally {
      setIsProcessing(false); // Clear processing state when done
      isSpeakingRef.current = false;
      startListening();
    }
  };

  const getDeepgramToken = async () => {
    try {
      const response = await fetch("/api/deepgram");
      if (response.ok) {
        const data = await response.json();
        return data.token;
      }
    } catch (error) {
      console.log("API route not available, using client key for development.");
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
        model: "nova-2",
        interim_results: true,
        smart_format: true,
        language: "en-US",
        utterance_end_ms: 2000,
      });
      deepgramConnectionRef.current = connection;
      connection.on(LiveTranscriptionEvents.Open, () => {
        console.log("✅ Deepgram connection opened.");
        setIsListening(true);
        setIsConnecting(false);
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.ondataavailable = (event) => {
          if (
            event.data.size > 0 &&
            connection.getReadyState() === 1 &&
            !isSpeakingRef.current
          ) {
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
      speakWithDeepgram(
        "Sorry, I couldn't access your microphone or connect to the speech service."
      );
    }
  };

  const stopListening = async () => {
    console.log("Stopping listening...");
    clearTimeout(listenTimeoutRef.current);
    cancelSpeech();
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
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
    clearTimeout(listenTimeoutRef.current);

    // If this is the first time (hasn't spoken intro yet), play introduction first
    if (!hasSpokenRef.current) {
      await playIntroduction();
      return;
    }

    if (isListening) {
      await stopListening();
      return;
    }
    console.log("Starting voice recognition...");
    cancelSpeech();
    await connectToDeepgram();

    listenTimeoutRef.current = setTimeout(() => {
      if (isListening && !isSpeakingRef.current) {
        console.log(
          "1-minute silence detected, restarting connection for continuous conversation..."
        );
        stopListening().then(connectToDeepgram);
      }
    }, 60000);
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
            isConnecting={isConnecting || isPlayingIntro || isProcessing} // Include processing state
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
