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
  const recognitionRef = useRef(null);
  const isSpeakingRef = useRef(false); // Tracks if agent is speaking

  const cancelSpeech = () => {
    isSpeakingRef.current = false;
    speechSynthesis.cancel(); // Immediately stop any ongoing TTS
  };
  const speakAsync = (text) =>
    new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = resolve;
      speechSynthesis.speak(utterance);
    });
  const hasSpokenRef = useRef(false);

  useEffect(() => {
    if (!hasSpokenRef.current) {
      const introText = "Hi! I'm your portfolio assistant. I can help you explore projects, experiences, and blog posts through voice commands. Click the voice button and ask me about anything you'd like to know!";
      isSpeakingRef.current = true;
      speakAsync(introText).then(() => {
        isSpeakingRef.current = false;
      });
      hasSpokenRef.current = true;
    }
  }, []);

  const handleTranscript = async (transcript) => {
    cancelSpeech(); // Stop previous speech if any
    isSpeakingRef.current = true;

    try {
      const response = await askPortfolioAgent(transcript);
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

      // Speak start
      if (response.start && isSpeakingRef.current) {
        await speakAsync(new SpeechSynthesisUtterance(response.start));
      }

      for (const step of response.steps || []) {
        if (!isSpeakingRef.current) break; // Stop if interrupted

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
    }
  };

  const startListening = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      console.error("Speech recognition not supported");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);

    recognition.onend = () => {
      if (isListening) recognition.start(); // auto-restart
    };

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      console.log("User said:", transcript);
      handleTranscript(transcript); // Interruptible response
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);
    cancelSpeech();
  };

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
            startListening={startListening}
            stopListening={stopListening}
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
