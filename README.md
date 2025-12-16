# Voice-Enabled Portfolio Assistant

A React-based personal portfolio enhanced with a **voice assistant** that allows interactive exploration of projects, blog posts, and experience sections using natural speech commands. The assistant integrates **live STT, AI reasoning, and TTS**, and can even trigger **UI actions** like scrolling and navigation.

---

## Features

- **Voice Navigation:** Browse Home, Projects, Blog, and Experience sections through spoken commands.
- **Live Speech-to-Text (STT):** Converts user speech into text in real-time using **Deepgram STT (`nova-2` model)**.
- **AI-Powered Reasoning:** Uses **Groq LLM API (`llama-3.3-70b-versatile` model)** to interpret user queries and generate structured responses.
- **Text-to-Speech Feedback (TTS):** Speaks back responses using **Deepgram TTS (`aura-orpheus-en` model)** or browser fallback.
- **Interactive UI Actions:** Scrolls to elements or navigates between pages based on agent instructions.
- **Smart Context Handling:** Maintains conversation history for more accurate responses.

---

## Project Architecture

The voice assistant is structured into **three main processes**. The diagram below illustrates the entire flow visually:

![Voice Assistant Architecture](./src/assets/voice-assistant-diagram.svg)

### **1. Speech-to-Text (STT) Process**
- Captures user speech via the browser microphone.  
- Streams audio chunks (~250ms) to **Deepgram STT (`nova-2` model)** using WebSocket.  
- Deepgram returns real-time transcription events, which are aggregated into **final text**.

### **2. Groq LLM Process**
- Sends the final text to **Groq LLM API (`llama-3.3-70b-versatile` model)**.  
- LLM interprets the query and generates a **structured JSON response** containing:
  - UI actions (scroll, page navigation)  
  - Text for TTS feedback  
- Frontend parses the response to control **React UI** and voice output.

```json
{
  "start": "Here are my projects.",
  "steps": [
    {
      "category": "project",
      "targetKey": "project-1",
      "title": "AI Voice Interaction System",
      "introduction": "Check this one out",
      "description": "A React-based AI voice assistant that interacts with UI elements."
    }
  ],
  "end": "Let me know if you'd like details."
}
```

### **3. Text-to-Speech (TTS) Process**
- Converts the agent’s text response to audio using **Deepgram TTS (`aura-orpheus-en` model)**.  
- Plays audio in the browser so the **user hears the response**.  
- STT pauses during playback to prevent audio feedback loops.

This architecture enables **hands-free portfolio navigation**, **real-time conversational feedback**, and **dynamic UI interaction**.