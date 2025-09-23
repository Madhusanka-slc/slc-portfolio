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

  const cancelSpeech = () => {
    isSpeakingRef.current = false;
    speechSynthesis.cancel();
  };

  const speakAsync = (text) =>
    new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = resolve;
      speechSynthesis.speak(utterance);
    });

  useEffect(() => {
    if (!hasSpokenRef.current) {
      const introText =
        "Hi! I'm your portfolio assistant. I can help you explore projects, experiences, and blog posts through voice commands. Click the voice button and ask me about anything you'd like to know!";
      isSpeakingRef.current = true;
      speakAsync(introText).then(() => {
        isSpeakingRef.current = false;
      });
      hasSpokenRef.current = true;
    }
  }, []);

  const handleAgentResponse = async (finalTranscript) => {
    if (!finalTranscript || isSpeakingRef.current) return;

    console.log("Processing final transcript:", finalTranscript);
    isSpeakingRef.current = true;

    // Add user's new message to the history
    const newMessages = [...conversationHistoryRef.current, { role: "user", content: finalTranscript }];

    try {
      const response = await askPortfolioAgent(finalTranscript, newMessages);
      console.log("========== Voice Agent DEBUG ==========");
      console.log("Full Response Object:", response);
      
      // Add the agent's response to the history and trim
      conversationHistoryRef.current = [...newMessages, { role: "assistant", content: JSON.stringify(response) }];
      if (conversationHistoryRef.current.length > 6) {
        conversationHistoryRef.current = conversationHistoryRef.current.slice(conversationHistoryRef.current.length - 6);
      }
      
      // Handling the "irrelevant question" response from the agent
      if (!response?.steps?.length && response.start.includes("I'm sorry, I can't find that")) {
        speakAsync(response.start);
        return;
      }

      const speakAsyncChain = (utterance) =>
        new Promise((resolve) => {
          utterance.onend = resolve;
          speechSynthesis.speak(utterance);
        });

      if (response.start && isSpeakingRef.current) {
        await speakAsyncChain(new SpeechSynthesisUtterance(response.start));
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
          await speakAsyncChain(new SpeechSynthesisUtterance(step.introduction));
        if (!isSpeakingRef.current) break;
        if (step.description)
          await speakAsyncChain(new SpeechSynthesisUtterance(step.description));
      }

      if (response.end && isSpeakingRef.current) {
        await speakAsyncChain(new SpeechSynthesisUtterance(response.end));
      }
    } catch (err) {
      console.error("Voice agent error:", err);
      if (isSpeakingRef.current)
        speakAsync("Sorry, I could not understand that.");
    } finally {
      isSpeakingRef.current = false;
      lastTranscriptRef.current = "";
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
          // THE FIX: Only send audio data if the app is not speaking
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
        speakAsync("Sorry, a connection error occurred.");
      });
      connection.on(LiveTranscriptionEvents.SpeechStarted, () => {
        console.log("Speech started - user is talking");
      });
      connection.on(LiveTranscriptionEvents.SpeechEnded, () => {
        console.log("Speech ended.");
      });
      connection.on(LiveTranscriptionEvents.Transcript, (data) => {
        const transcript = data.channel.alternatives[0].transcript;
        if (transcript) {
          lastTranscriptRef.current = transcript;
        }
      });
      connection.on(LiveTranscriptionEvents.UtteranceEnd, () => {
        const finalTranscript = lastTranscriptRef.current.trim();
        if (finalTranscript) {
          handleAgentResponse(finalTranscript);
          lastTranscriptRef.current = "";
        }
      });
    } catch (error) {
      console.error("❌ Error connecting to Deepgram:", error);
      setIsListening(false);
      setIsConnecting(false);
      speakAsync("Sorry, I couldn't access your microphone or connect to the speech service.");
    }
  };

  const stopListening = async () => {
    console.log("Stopping listening...");
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
    lastTranscriptRef.current = "";
    console.log("Listening stopped completely");
  };

  const startListening = async () => {
    if (isListening) {
      await stopListening();
      return;
    }
    console.log("Starting voice recognition...");
    cancelSpeech();
    await connectToDeepgram();
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