/**
 * voiceService.js
 * ------------------------------------------------------------------
 * Centralized service responsible for all Text-to-Speech (TTS) playback
 * in the voice-enabled portfolio application.
 *
 * Responsibilities:
 * - Retrieve and manage Deepgram API authentication tokens
 * - Convert text responses into speech using Deepgram TTS
 * - Gracefully fall back to the browser’s built-in SpeechSynthesis API
 * - Handle audio playback lifecycle (play, end, error, cleanup)
 * - Ensure only one audio stream plays at a time
 * - Provide a global cancellation mechanism for ongoing speech
 *
 * Used by:
 * - React hooks managing voice interaction (e.g., useVoiceAssistant)
 * - Response handling and navigation flows triggered by the agent
 */

export const voiceService = {
  currentAudio: null,

  // Get Deepgram token
  async getToken() {
    try {
      const response = await fetch("/api/deepgram");
      if (response.ok) {
        const data = await response.json();
        return data.token;
      }
    } catch (error) {
      console.log("Using client key for development");
    }
    return import.meta.env.VITE_DEEPGRAM_KEY;
  },

  // Speak with Deepgram TTS (with browser fallback)
  async speak(text) {
    try {
      const key = await this.getToken();
      if (!key) return this.speakBrowser(text);

      const response = await fetch(
        `https://api.deepgram.com/v1/speak?model=aura-orpheus-en`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) return this.speakBrowser(text);

      const audioBlob = await response.blob();
      await this.playAudio(audioBlob);
    } catch (error) {
      console.log("Deepgram failed, using browser TTS:", error);
      return this.speakBrowser(text);
    }
  },

  // Play audio blob
  async playAudio(audioBlob) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      this.currentAudio = audio;

      audio.onended = () => {
        this.currentAudio = null;
        resolve();
      };

      audio.onerror = (error) => {
        this.currentAudio = null;
        reject(error);
      };

      const audioUrl = URL.createObjectURL(audioBlob);
      audio.src = audioUrl;
      audio.play().catch(reject);

      // Cleanup
      audio.addEventListener("ended", () => {
        setTimeout(() => URL.revokeObjectURL(audioUrl), 2000);
      }, { once: true });
    });
  },

  // Browser TTS fallback
  speakBrowser(text) {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = resolve;
      speechSynthesis.speak(utterance);
    });
  },

  // Cancel any speech
  cancel() {
    speechSynthesis.cancel();
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.src = "";
      this.currentAudio = null;
    }
  },
};