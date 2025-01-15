"use client";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Icon } from "@iconify/react";

interface voiceProps {
  id: string;
  url: string;
}
[];

const PlayVoice = ({ voice }: { voice: voiceProps[] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(0);
  const [isClient, setIsClient] = useState(false); // Track if the component is on the client

  useEffect(() => {
    setIsClient(true); // Set to true after mounting on the client
  }, []);

  // Skeleton loader for the entire component
  if (!voice) {
    return (
      <div className="flex items-center gap-2 animate-pulse">
        {/* Skeleton for microphone icon and count */}
        <div className="w-20 h-8 bg-gray-200 rounded-lg"></div>

        {/* Skeleton for player controls */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>

        {/* Skeleton for ReactPlayer */}
        <div className="w-full md:w-[300px] h-[50px] bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  // Validate the voice array
  if (voice.length === 0) {
    return (
      <div className="flex items-center gap-2">
        <span className="flex items-center text-xs bg-purple-800 p-1 rounded-lg border border-purple-400 text-purple-300 justify-center">
          <Icon icon="mdi:microphone" className="w-4 h-4 mr-1" />0
        </span>
        <p className="text-xs text-red-500">No voice recordings available.</p>
      </div>
    );
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextVoice = () => {
    if (currentVoiceIndex < voice.length - 1) {
      setCurrentVoiceIndex(currentVoiceIndex + 1);
      setIsPlaying(true); // Auto-play the next voice
    }
  };

  const handlePreviousVoice = () => {
    if (currentVoiceIndex > 0) {
      setCurrentVoiceIndex(currentVoiceIndex - 1);
      setIsPlaying(true); // Auto-play the previous voice
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 w-full">
      {/* Microphone icon and count */}
      <span className="flex items-center text-xs bg-purple-800 p-1 rounded-lg border border-purple-400 text-purple-300 justify-center">
        <Icon icon="mdi:microphone" className="w-4 h-4 mr-1" />
        {voice.length}
      </span>

      {/* Audio Player Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePreviousVoice}
          disabled={currentVoiceIndex === 0}
          className="p-1 disabled:opacity-50"
        >
          <Icon icon="mdi:skip-previous" className="w-4 h-4" />
        </button>
        <button onClick={handlePlayPause} className="p-1">
          <Icon
            icon={isPlaying ? "mdi:pause" : "mdi:play"}
            className="w-4 h-4"
          />
        </button>
        <button
          onClick={handleNextVoice}
          disabled={currentVoiceIndex === voice.length - 1}
          className="p-1 disabled:opacity-50"
        >
          <Icon icon="mdi:skip-next" className="w-4 h-4" />
        </button>
      </div>

      {/* ReactPlayer with responsive width */}
      <div className="w-full  ">
        {isClient ? (
          <ReactPlayer
            url={voice[currentVoiceIndex].url}
            playing={isPlaying}
            controls
            width="100%"
            height="50px"
            onEnded={() => setIsPlaying(false)}
            onError={(error) => {
              console.error("Error loading audio:", error);
              setIsPlaying(false);
            }}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload", // Disable the download button
                },
              },
            }}
            style={{
              borderRadius: "8px", // Rounded corners
              overflow: "hidden", // Ensure content stays within rounded corners
            }}
          />
        ) : (
          <div className="w-full h-[50px] bg-gray-200 rounded-lg animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default PlayVoice;
