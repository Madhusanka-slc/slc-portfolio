import React, { useState, useRef, useEffect } from "react";
import NavLink from "./NavLink";
import { scroller } from "react-scroll";
import { askPortfolioAgent } from "../agent/portfolioAgent";
import { allProjects } from "../data/projectsData";
import { allExperiences } from "../data/experiencesData";
import { allBlogs } from "../data/blogsData";
import VoiceButton from "./VoiceButton";

const Header = ({
  setCurrentPage,
  currentPage,
  projectRefs,
  blogRefs,
  experienceRefs,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const deepgramSocketRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const hasSpokenRef = useRef(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneGainRef = useRef(null);
  const speechTimeoutRef = useRef(null);
  const lastTranscriptRef = useRef("");
  const isSpeechActiveRef = useRef(false);

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

  const handleTranscript = async (transcript) => {
    // Clear any existing timeout
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }

    // Update the latest transcript
    lastTranscriptRef.current = transcript;

    // Set a timeout to process the transcript after user stops talking
    speechTimeoutRef.current = setTimeout(async () => {
      const finalTranscript = lastTranscriptRef.current.trim();

      if (!finalTranscript || isSpeakingRef.current) return;

      console.log("Processing final transcript:", finalTranscript);
      isSpeakingRef.current = true;

      try {
        const response = await askPortfolioAgent(finalTranscript);
        console.log("========== Voice Agent DEBUG ==========");
        console.log("Full Response Object:", response);

        if (!response?.steps || response.steps.length === 0) {
          if (!isSpeakingRef.current) return;
          speechSynthesis.speak(
            new SpeechSynthesisUtterance(
              "I usually focus on sharing my portfolio, skills, projects, and experiences — would you like me to walk you through those?"
            )
          );
          return;
        }

        const speakAsync = (utterance) =>
          new Promise((resolve) => {
            utterance.onend = () => resolve();
            speechSynthesis.speak(utterance);
          });

        if (response.start && isSpeakingRef.current) {
          await speakAsync(new SpeechSynthesisUtterance(response.start));
        }

        for (const step of response.steps || []) {
          if (!isSpeakingRef.current) break;

          let target = null;
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
                target = projectRefs?.current?.[targetKey];
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
                target = blogRefs?.current?.[targetKey];
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
                target = experienceRefs?.current?.[targetKey];
              }
              break;
            }
          }

          if (!target && targetKey) {
            await new Promise((r) => setTimeout(r, 800));
            switch (step.category) {
              case "project":
                target = projectRefs?.current?.[targetKey];
                break;
              case "blog":
                target = blogRefs?.current?.[targetKey];
                break;
              case "experience":
                target = experienceRefs?.current?.[targetKey];
                break;
            }
          }

          if (target && targetKey) {
            scroller.scrollTo(targetKey, {
              duration: 800,
              smooth: true,
              offset: -100,
            });
            await new Promise((r) => setTimeout(r, 300));
          }

          if (!isSpeakingRef.current) break;

          if (step.introduction)
            await speakAsync(new SpeechSynthesisUtterance(step.introduction));
          if (!isSpeakingRef.current) break;
          if (step.description)
            await speakAsync(new SpeechSynthesisUtterance(step.description));
        }

        if (response.end && isSpeakingRef.current) {
          await speakAsync(new SpeechSynthesisUtterance(response.end));
        }
      } catch (err) {
        console.error("Voice agent error:", err);
        if (isSpeakingRef.current)
          speechSynthesis.speak(
            new SpeechSynthesisUtterance("Sorry, I could not understand that.")
          );
      } finally {
        isSpeakingRef.current = false;
        isSpeechActiveRef.current = false;
        lastTranscriptRef.current = "";
      }
    }, 2000); // Wait 2 seconds after last speech input
  };

  const connectToDeepgram = async () => {
    setIsConnecting(true);

    try {
      // Get microphone access with enhanced settings
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          // Additional settings to reduce feedback
          googEchoCancellation: true,
          googNoiseSuppression: true,
          googAutoGainControl: true,
          googHighpassFilter: true,
        },
      });
      audioStreamRef.current = stream;

      // Create audio context for microphone control
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);

      // Create gain node for microphone muting
      microphoneGainRef.current = audioContextRef.current.createGain();
      microphoneGainRef.current.gain.value = 1; // Start with normal volume

      // Create analyser for audio level detection
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;

      // Connect audio nodes
      source.connect(microphoneGainRef.current);
      microphoneGainRef.current.connect(analyserRef.current);

      // Connect to Deepgram
      const deepgramKey = import.meta.env.VITE_DEEPGRAM_KEY;
      if (!deepgramKey) {
        throw new Error("Deepgram API key not found");
      }

      const wsUrl = `wss://api.deepgram.com/v1/listen?model=nova-2&language=en-US&smart_format=true&interim_results=true&endpointing=1500&vad_events=true&punctuate=true`;
      const socket = new WebSocket(wsUrl, ["token", deepgramKey]);

      socket.onopen = () => {
        console.log("Connected to Deepgram");
        setIsListening(true);
        setIsConnecting(false);

        // Start recording and sending audio
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm;codecs=opus",
        });

        let isCurrentlySpeaking = false;

        mediaRecorder.ondataavailable = (event) => {
          // Only send audio if we're not speaking and have audio data
          if (
            event.data.size > 0 &&
            socket.readyState === WebSocket.OPEN &&
            !isSpeakingRef.current &&
            !isCurrentlySpeaking
          ) {
            // Check audio levels to avoid sending silent audio
            const audioLevel = getAudioLevel();
            if (audioLevel > 0.01) {
              // Only send if there's actual audio
              socket.send(event.data);
            }
          }
        };

        // Function to get current audio level
        const getAudioLevel = () => {
          if (!analyserRef.current) return 0;

          const bufferLength = analyserRef.current.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          analyserRef.current.getByteFrequencyData(dataArray);

          let sum = 0;
          for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
          }
          return sum / bufferLength / 255;
        };

        mediaRecorder.start(250); // Send chunks every 250ms
        mediaRecorderRef.current = mediaRecorder;
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // Handle speech detection events
          if (data.type === "SpeechStarted") {
            console.log("Speech started - user is talking");
            isSpeechActiveRef.current = true;
            // Clear any pending timeouts when user starts talking again
            if (speechTimeoutRef.current) {
              clearTimeout(speechTimeoutRef.current);
            }
            return;
          }

          if (data.channel?.alternatives?.[0]?.transcript) {
            const transcript = data.channel.alternatives[0].transcript.trim();

            if (transcript && !isSpeakingRef.current) {
              // For interim results, just log and update but don't process
              if (!data.is_final) {
                console.log("Interim:", transcript);
                // Update the ongoing transcript
                lastTranscriptRef.current = transcript;
                return;
              }

              // For final results, still buffer them
              console.log("Final transcript received:", transcript);

              // Additional filtering to avoid processing our own speech
              const isLikelyOwnSpeech =
                transcript.toLowerCase().includes("portfolio") ||
                transcript.toLowerCase().includes("assistant") ||
                transcript.toLowerCase().includes("usually focus") ||
                transcript.toLowerCase().includes("walk you through");

              if (!isLikelyOwnSpeech && transcript.split(" ").length >= 2) {
                handleTranscript(transcript);
              } else {
                console.log("Filtered out likely echo:", transcript);
              }
            }
          }
        } catch (err) {
          console.error("Error parsing Deepgram response:", err);
        }
      };

      socket.onerror = (error) => {
        console.error("Deepgram WebSocket error:", error);
        setIsListening(false);
        setIsConnecting(false);
      };

      socket.onclose = () => {
        console.log("Deepgram connection closed");
        setIsListening(false);
        setIsConnecting(false);
      };

      deepgramSocketRef.current = socket;
    } catch (error) {
      console.error("Error connecting to Deepgram:", error);
      setIsListening(false);
      setIsConnecting(false);

      // Show user-friendly error
      speechSynthesis.speak(
        new SpeechSynthesisUtterance(
          "Sorry, I couldn't access your microphone or connect to the speech service."
        )
      );
    }
  };

  const startListening = () => {
    if (isListening || isConnecting) return;

    console.log("Starting voice recognition...");
    console.log("Deepgram Key available:", !!import.meta.env.VITE_DEEPGRAM_KEY);
    console.log("User media supported:", !!navigator.mediaDevices.getUserMedia);

    // Cancel any ongoing speech before starting to listen
    cancelSpeech();
    connectToDeepgram();
  };

  const stopListening = () => {
    setIsListening(false);
    setIsConnecting(false);
    cancelSpeech();

    // Clear any pending speech timeouts
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }

    // Stop media recorder
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    // Close WebSocket connection
    if (
      deepgramSocketRef.current &&
      deepgramSocketRef.current.readyState === WebSocket.OPEN
    ) {
      deepgramSocketRef.current.close();
    }

    // Stop audio stream
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }

    // Clean up audio context
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
    }

    // Clean up refs
    mediaRecorderRef.current = null;
    deepgramSocketRef.current = null;
    audioContextRef.current = null;
    analyserRef.current = null;
    microphoneGainRef.current = null;
    speechTimeoutRef.current = null;
    lastTranscriptRef.current = "";
    isSpeechActiveRef.current = false;
  };

  // Cleanup on unmount
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
