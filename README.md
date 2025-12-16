# Voice-Enabled Portfolio Assistant

A React-based personal portfolio enhanced with a **voice assistant** that allows interactive exploration of projects, blog posts, and experience sections using natural speech commands. The assistant integrates **live STT, AI reasoning, and TTS**, and can even trigger **UI actions** like scrolling and navigation.

---

## Features

- **Voice Navigation:** Browse Home, Projects, Blog, and Experience sections through spoken commands.
- **Live Speech-to-Text (STT):** Converts user speech into text in real-time using Deepgram.
- **AI-Powered Reasoning:** Uses Groq LLM API to interpret user queries and generate structured responses.
- **Text-to-Speech Feedback (TTS):** Speaks back responses using Deepgram TTS or browser fallback.
- **Interactive UI Actions:** Scrolls to elements or navigates between pages based on agent instructions.
- **Smart Context Handling:** Maintains conversation history for more accurate responses.

---

## Project Architecture

The voice assistant in this portfolio is divided into **three main processes**. The diagram below illustrates the flow:

![Voice Assistant Architecture](./assets/voice-assistant-diagram.svg)  

### 1. Speech-to-Text (STT) Process
- Captures user speech via the browser microphone.  
- Streams audio chunks (~250ms) to **Deepgram STT** through WebSocket.  
- Aggregates transcription events into **final text** for further processing.

### 2. Groq LLM Process
- Sends the final text from STT to **Groq LLM API**.  
- LLM interprets the query and generates a **structured JSON response**, including:
  - UI actions (scroll, page navigation)
  - Text for TTS feedback  
- Frontend parses the response to control the UI and voice output.

### 3. Text-to-Speech (TTS) Process
- Converts the agent’s text response to audio using **Deepgram TTS** (with browser fallback).  
- Plays audio in the browser so the **user hears the assistant response**.  
- STT pauses during playback to prevent audio feedback loops.

This architecture enables **hands-free navigation**, **interactive UI control**, and **real-time conversational feedback** in the portfolio.
