import React from "react";

const VoiceButton = ({
  isListening,
  isConnecting = false,
  isProcessing = false,
  startListening,
  stopListening,
  waveformStyle = "smooth",
}) => {
  // SVG paths for the microphone icon
  const micIconPath =
    "M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM15 13v2a3 3 0 01-6 0v-2M12 21a6 6 0 01-6-6v-1a1 1 0 00-2 0v1a8 8 0 0016 0v-1a1 1 0 00-2 0v1a6 6 0 01-6 6z";

  // Enhanced waveform options
  const waveformPaths = {
    // Original basic waveform
    basic:
      "M12 2a1 1 0 011 1v18a1 1 0 01-2 0V3a1 1 0 011-1zM4 9a1 1 0 011 1v11a1 1 0 01-2 0V10a1 1 0 011-1zM20 9a1 1 0 011 1v11a1 1 0 01-2 0V10a1 1 0 011-1zM16 5a1 1 0 011 1v15a1 1 0 01-2 0V6a1 1 0 011-1zM8 5a1 1 0 011 1v15a1 1 0 01-2 0V6a1 1 0 011-1z",
    // Dynamic audio bars (recommended)
    dynamic:
      "M3 12c0-.5.4-1 1-1s1 .5 1 1v6c0 .5-.4 1-1 1s-1-.5-1-1v-6zm4-4c0-.5.4-1 1-1s1 .5 1 1v8c0 .5-.4 1-1 1s-1-.5-1-1V8zm4-6c0-.5.4-1 1-1s1 .5 1 1v16c0 .5-.4 1-1 1s-1-.5-1-1V2zm4 3c0-.5.4-1 1-1s1 .5 1 1v14c0 .5-.4 1-1 1s-1-.5-1-1V5zm4 4c0-.5.4-1 1-1s1 .5 1 1v6c0 .5-.4 1-1 1s-1-.5-1-1V9z",
    // Smooth with rounded caps (modern)
    smooth:
      "M3 12c0-.8.6-1.5 1.5-1.5s1.5.7 1.5 1.5v4c0 .8-.6 1.5-1.5 1.5S3 16.8 3 16v-4zm4-3c0-.8.6-1.5 1.5-1.5S10 8.2 10 9v6c0 .8-.6 1.5-1.5 1.5S7 15.8 7 15V9zm4-7c0-.8.6-1.5 1.5-1.5S14 1.2 14 2v20c0 .8-.6 1.5-1.5 1.5S11 22.8 11 22V2zm4 4c0-.8.6-1.5 1.5-1.5S18 5.2 18 6v12c0 .8-.6 1.5-1.5 1.5S15 18.8 15 18V6zm4 5c0-.8.6-1.5 1.5-1.5S22 10.2 22 11v2c0 .8-.6 1.5-1.5 1.5S19 13.8 19 13v-2z",
    // Professional style
    professional:
      "M2 11h2v2H2v-2zm3-3h1v8H5V8zm2-2h1v12H7V6zm2-4h1v16H9V2zm2 1h1v14h-1V3zm2 2h1v10h-1V5zm2-1h1v12h-1V4zm2 3h1v6h-1V7zm2 1h1v4h-1V8z",
    // Animated style (perfect for recording states)
    animated:
      "M2 12c0-1.1.9-2 2-2s2 .9 2 2v2c0 1.1-.9 2-2 2s-2-.9-2-2v-2zm4-2c0-1.1.9-2 2-2s2 .9 2 2v4c0 1.1-.9 2-2 2s-2-.9-2-2v-4zm4-6c0-1.1.9-2 2-2s2 .9 2 2v12c0 1.1-.9 2-2 2s-2-.9-2-2V4zm4 2c0-1.1.9-2 2-2s2 .9 2 2v8c0 1.1-.9 2-2 2s-2-.9-2-2V6zm4 3c0-1.1.9-2 2-2s2 .9 2 2v6c0 1.1-.9 2-2 2s-2-.9-2-2V9z",
  };

  // Render animated waveform (CSS-based animation)
  const renderAnimatedWaveform = () => (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect
        x="3"
        y={isListening && !isConnecting && !isProcessing ? "10" : "12"}
        width="2"
        height={isListening && !isConnecting && !isProcessing ? "8" : "4"}
        rx="1"
        style={{ transition: "all 0.3s ease" }}
      />
      <rect
        x="7"
        y={isListening && !isConnecting && !isProcessing ? "8" : "11"}
        width="2"
        height={isListening && !isConnecting && !isProcessing ? "12" : "6"}
        rx="1"
        style={{ transition: "all 0.3s ease", transitionDelay: "0.1s" }}
      />
      <rect
        x="11"
        y={isListening && !isConnecting && !isProcessing ? "4" : "10"}
        width="2"
        height={isListening && !isConnecting && !isProcessing ? "20" : "8"}
        rx="1"
        style={{ transition: "all 0.3s ease", transitionDelay: "0.2s" }}
      />
      <rect
        x="15"
        y={isListening && !isConnecting && !isProcessing ? "6" : "9"}
        width="2"
        height={isListening && !isConnecting && !isProcessing ? "16" : "10"}
        rx="1"
        style={{ transition: "all 0.3s ease", transitionDelay: "0.1s" }}
      />
      <rect
        x="19"
        y={isListening && !isConnecting && !isProcessing ? "9" : "12"}
        width="2"
        height={isListening && !isConnecting && !isProcessing ? "10" : "4"}
        rx="1"
        style={{ transition: "all 0.3s ease" }}
      />
    </svg>
  );

  // Render minimalist waveform (stroke-based)
  const renderMinimalistWaveform = () => (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 12v4m4-6v8m4-10v12m4-8v8m4-4v4" />
    </svg>
  );

  // Render connecting spinner
  const renderConnectingSpinner = () => (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 11-6.219-8.56" />
    </svg>
  );

  // Render processing icon with enhanced animation
  const renderProcessingIcon = () => (
    <svg
      className="h-4 w-4 animate-pulse"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <circle cx="4" cy="12" r="1">
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
      <circle cx="20" cy="12" r="1">
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.3s"
        />
      </circle>
      <circle cx="12" cy="4" r="1">
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.6s"
        />
      </circle>
      <circle cx="12" cy="20" r="1">
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.9s"
        />
      </circle>
    </svg>
  );

  // Render the appropriate icon
  const renderIcon = () => {
    if (isConnecting) {
      return renderConnectingSpinner();
    }
    if (isProcessing) {
      return renderProcessingIcon();
    }
    if (!isListening) {
      // Always show microphone when not listening
      return (
        <svg
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d={micIconPath} />
        </svg>
      );
    }
    // Show waveform when listening
    switch (waveformStyle) {
      case "css-animated":
        return renderAnimatedWaveform();
      case "minimalist":
        return renderMinimalistWaveform();
      default:
        return (
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d={waveformPaths[waveformStyle] || waveformPaths.dynamic} />
          </svg>
        );
    }
  };

  // Handle button click
  const handleClick = () => {
    if (isConnecting || isProcessing) return; // Prevent clicks while connecting or processing
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Get appropriate aria label and title
  const getButtonLabels = () => {
    if (isConnecting) {
      return {
        ariaLabel: "Connecting to voice service",
        title: "Connecting...",
      };
    } else if (isProcessing) {
      return {
        ariaLabel: "Processing your request",
        title: "Processing...",
      };
    } else if (isListening) {
      return {
        ariaLabel: "Stop Listening",
        title: "Stop Listening",
      };
    } else {
      return {
        ariaLabel: "Start Listening",
        title: "Start Voice Assistant",
      };
    }
  };

  const buttonLabels = getButtonLabels();

  return (
    <button
      onClick={handleClick}
      disabled={isConnecting || isProcessing} // Disable during both connecting and processing
      aria-label={buttonLabels.ariaLabel}
      title={buttonLabels.title}
      className={`
        h-8 w-8
        rounded-full
        transition-colors duration-300
        flex items-center justify-center
        bg-[#1d1e20] border border-gray-500
        ${
          isConnecting || isProcessing
            ? "cursor-not-allowed opacity-75"
            : "cursor-pointer"
        }
        ${
          isListening && !isConnecting && !isProcessing
            ? "text-gray-400 gray-200 bg-[#424242] hover:border-gray-400 hover:text-white"
            : "text-gray-400 hover:border-gray-400 hover:text-gray-300"
        }
        ${isConnecting ? "border-yellow-400 text-yellow-400" : ""}
        ${isProcessing ? "border-blue-400 text-blue-400" : ""}
      `}
    >
      {renderIcon()}
    </button>
  );
};

export default VoiceButton;
