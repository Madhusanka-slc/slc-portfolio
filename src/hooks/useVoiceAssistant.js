/**
 * useVoiceAssistant.js
 * ------------------------------------------------------------------
 * Central React hook that orchestrates the entire voice assistant flow
 * for the portfolio application, combining STT, TTS, AI reasoning,
 * and UI navigation into a single cohesive controller.
 *
 * Integrations:
 * - Deepgram SDK (live speech-to-text)
 * - voiceService (Deepgram TTS + browser TTS fallback)
 * - agentService (LLM-powered portfolio agent via Cerebras / Groq / etc.)
 * - react-scroll (smooth UI navigation based on agent steps)
 *
 * Used by:
 * - Voice assistant UI entry points (mic button, voice toggle)
 * - Portfolio pages that support voice-driven navigation
 */

import { useState, useRef, useCallback } from 'react';
import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';
import { voiceService } from '../services/voiceService';
import { agentService } from '../services/agentService';
import { scroller } from 'react-scroll';

export const useVoiceAssistant = ({ setCurrentPage, currentPage }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const connectionRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const transcriptRef = useRef('');
  const historyRef = useRef([]);
  const isSpeakingRef = useRef(false);
  const hasIntroRef = useRef(false);
  const isProcessingTranscriptRef = useRef(false); // Prevent double processing

  // Start Deepgram connection
  const startDeepgram = useCallback(async () => {
    if (connectionRef.current || isListening) {
      console.log('Already connected, skipping...');
      return;
    }

    try {
      console.log('Starting Deepgram connection...');
      const key = await voiceService.getToken();
      const deepgram = createClient(key);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const connection = deepgram.listen.live({
        model: 'nova-2',
        interim_results: true,
        smart_format: true,
        utterance_end_ms: 1500,
      });

      connectionRef.current = connection;

      connection.on(LiveTranscriptionEvents.Open, () => {
        console.log('✅ Deepgram connected');
        setIsListening(true);
        
        const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        recorderRef.current = recorder;

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0 && !isSpeakingRef.current && connection.getReadyState() === 1) {
            connection.send(e.data);
          }
        };

        recorder.start(250);
      });

      connection.on(LiveTranscriptionEvents.Transcript, (data) => {
        const text = data.channel.alternatives[0].transcript;
        if (data.is_final && text) {
          console.log('📝 Transcript:', text);
          transcriptRef.current += text + ' ';
        }
      });

      connection.on(LiveTranscriptionEvents.UtteranceEnd, () => {
        console.log('🔚 Utterance ended');
        if (!isSpeakingRef.current && !isProcessingTranscriptRef.current) {
          processTranscript();
        }
      });

      connection.on(LiveTranscriptionEvents.Close, () => {
        console.log('🔌 Connection closed');
        setIsListening(false);
      });

      connection.on(LiveTranscriptionEvents.Error, (error) => {
        console.error('❌ Deepgram error:', error);
        stopDeepgram();
      });

    } catch (error) {
      console.error('❌ Failed to start Deepgram:', error);
      await voiceService.speak("Sorry, I couldn't access your microphone.");
    }
  }, [isListening]);

  // Stop Deepgram connection
  const stopDeepgram = useCallback(() => {
    console.log('Stopping Deepgram...');
    
    if (recorderRef.current && recorderRef.current.state === 'recording') {
      recorderRef.current.stop();
    }
    recorderRef.current = null;
    
    if (connectionRef.current) {
      connectionRef.current.finish();
    }
    connectionRef.current = null;
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    streamRef.current = null;
    
    setIsListening(false);
    transcriptRef.current = '';
  }, []);

  // Process transcript
  const processTranscript = useCallback(async () => {
    if (isProcessingTranscriptRef.current) {
      console.log('Already processing, skipping...');
      return;
    }

    const text = transcriptRef.current.trim();
    transcriptRef.current = '';
    
    if (!text) {
      console.log('Empty transcript, skipping...');
      return;
    }

    isProcessingTranscriptRef.current = true;
    setIsProcessing(true);
    isSpeakingRef.current = true;

    // Stop listening while processing
    stopDeepgram();

    console.log('💭 Processing:', text);

    // Check for goodbye
    if (/(bye|goodbye|stop|exit)/i.test(text)) {
      await voiceService.speak("Goodbye! Feel free to come back anytime.");
      setIsProcessing(false);
      isSpeakingRef.current = false;
      isProcessingTranscriptRef.current = false;
      return; // Don't restart
    }

    try {
      // Get agent response
      const response = await agentService.ask(text, historyRef.current);
      console.log('🤖 Agent response:', response);
      
      // Update history
      historyRef.current = [
        ...historyRef.current,
        { role: 'user', content: text },
        { role: 'assistant', content: JSON.stringify(response) },
      ].slice(-8);

      // Execute response
      if (response.start && isSpeakingRef.current) {
        await voiceService.speak(response.start);
      }

      for (const step of response.steps || []) {
        if (!isSpeakingRef.current) break;

        // Navigate
        const pageMap = { project: 'projects', blog: 'blog', experience: 'experience' };
        const targetPage = pageMap[step.category];
        
        if (targetPage && currentPage !== targetPage) {
          setCurrentPage(targetPage);
          await new Promise(r => setTimeout(r, 1000));
        }

        // Scroll
        if (step.targetKey) {
          let element = null;
          let retries = 0;
          
          while (!element && retries < 5) {
            element = document.getElementById(step.targetKey);
            if (!element) {
              await new Promise(r => setTimeout(r, 200));
              retries++;
            }
          }
          
          if (element) {
            console.log(`📍 Scrolling to: ${step.targetKey}`);
            scroller.scrollTo(step.targetKey, { 
              duration: 800, 
              smooth: true,
              offset: -100 
            });
            await new Promise(r => setTimeout(r, 600));
          }
        }

        // Speak
        if (step.introduction && isSpeakingRef.current) {
          await voiceService.speak(step.introduction);
        }
        if (step.description && isSpeakingRef.current) {
          await voiceService.speak(step.description);
        }
      }

      if (response.end && isSpeakingRef.current) {
        await voiceService.speak(response.end);
      }

    } catch (error) {
      console.error('❌ Processing error:', error);
      if (isSpeakingRef.current) {
        await voiceService.speak("Sorry, I couldn't process that.");
      }
    } finally {
      setIsProcessing(false);
      isSpeakingRef.current = false;
      isProcessingTranscriptRef.current = false;
      
      // Restart listening
      console.log('🔄 Restarting listening...');
      await new Promise(r => setTimeout(r, 500)); // Small delay
      await startDeepgram();
    }
  }, [currentPage, setCurrentPage, stopDeepgram, startDeepgram]);

  // Main start function
  const start = useCallback(async () => {
    if (isListening || isProcessing) {
      console.log('Already active');
      return;
    }

    // Play intro first time only
    if (!hasIntroRef.current) {
      console.log('🎙️ Playing intro...');
      hasIntroRef.current = true;
      setIsProcessing(true);
      isSpeakingRef.current = true;
      
      await voiceService.speak("Hi! I'm your portfolio assistant. I can help you explore projects, experiences, and blog posts through voice commands. Ask me about anything you'd like to know!");
      
      isSpeakingRef.current = false;
      setIsProcessing(false);
    }

    // Start listening
    await startDeepgram();
  }, [isListening, isProcessing, startDeepgram]);

  // Stop everything
  const stop = useCallback(() => {
    console.log('⛔ Stopping completely...');
    stopDeepgram();
    voiceService.cancel();
    setIsProcessing(false);
    isSpeakingRef.current = false;
    isProcessingTranscriptRef.current = false;
  }, [stopDeepgram]);

  return {
    isListening,
    isConnecting: isProcessing,
    startListening: start,
    stopListening: stop,
  };
};

