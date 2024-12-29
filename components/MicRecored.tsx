'use client';

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ReactMic } from 'react-mic';
import { Button } from './ui/button';
import {Icon} from "@iconify/react";

interface AudioRecorderProps {
    maxRecordingTime: number;
    onRecordingComplete?: (file: File | undefined) => void;
    onRecordingStateChange?: (isRecording: boolean) => void;
    recordedBlob: Blob | null;
    setRecordedBlob: React.Dispatch<React.SetStateAction<Blob | null>>
}

export interface AudioRecorderRef {
    clearRecording: () => void;
}

const AudioRecorder = forwardRef<AudioRecorderRef, AudioRecorderProps>(({ 
    maxRecordingTime,
    onRecordingComplete,
    onRecordingStateChange,
    recordedBlob,
    setRecordedBlob
}, ref) => {
    const [recording, setRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (recording) {
            setRecordingTime(0);
            recordingTimeoutRef.current = setInterval(() => {
                setRecordingTime((prev) => {
                    if (prev >= maxRecordingTime) {
                        stopRecording();
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000);
        } else if (recordingTimeoutRef.current) {
            clearInterval(recordingTimeoutRef.current);
        }

        return () => {
            if (recordingTimeoutRef.current) {
                clearInterval(recordingTimeoutRef.current);
            }
        };
    }, [recording, maxRecordingTime]);

    useEffect(() => {
        onRecordingStateChange?.(recording);
    }, [recording, onRecordingStateChange]);

    useEffect(() => {
        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [audioUrl]);

    useImperativeHandle(ref, () => ({
        clearRecording: () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
            setRecordedBlob(null);
            setAudioUrl(null);
            setRecordingTime(0);
            setIsPlaying(false);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            if (onRecordingComplete) {
                onRecordingComplete(undefined);
            }
        }
    }));

    const startRecording = () => {
        setRecording(true);
        setRecordedBlob(null);
        setAudioUrl(null);
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const stopRecording = () => {
        setRecording(false);
    };

    const onStop = async (recordedData: { blob: Blob; blobURL: string }) => {
        const blob = recordedData.blob;
        const file = new File([blob], `audio_${Date.now()}.wav`, {
            type: 'audio/wav'
        });
        
        setRecordedBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        
        if (onRecordingComplete) {
            onRecordingComplete(file);
        }
    };

    const clearRecording = () => {
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }
        setRecordedBlob(null);
        setAudioUrl(null);
        setRecordingTime(0);
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        if (onRecordingComplete) {
            onRecordingComplete(undefined);
        }
    };

    const togglePlayback = () => {
        if (!audioRef.current || !audioUrl) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center gap-4 p-3 rounded-lg bg-background border border-input hover:bg-accent hover:text-accent-foreground transition-colors">
            <div className="flex-1 min-w-[200px]">
                <ReactMic
                    record={recording}
                    className="w-full h-8"
                    onStop={onStop}
                    mimeType="audio/wav"
                    strokeColor="#4f46e5"
                    backgroundColor="#f3f4f6"
                />
            </div>
            

            <div className="flex items-center gap-2">
                <span className="text-sm font-medium min-w-[40px]">
                    {formatTime(recordingTime)}
                </span>

                {recording ? (
                    <Button
                        onClick={stopRecording}
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        title="Stop recording"
                        type="button"
                    >
                        <Icon icon="material-symbols:stop-rounded" className="w-5 h-5" />
                    </Button>
                ) : (
                    <Button
                        onClick={startRecording}
                        variant="ghost"
                        size="icon"
                        className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                        title="Start recording"
                        type="button"
                        disabled={!!recordedBlob}
                    >
                        {/* <Mic className="h-5 w-5" /> */}
                        <Icon icon="material-symbols:mic-rounded" className="w-5 h-5" />       
                    </Button>
                )}

                {recordedBlob && (
                    <>
                        <Button
                            onClick={togglePlayback}
                            variant="ghost"
                            size="icon"
                            className="text-green-500 hover:text-green-600 hover:bg-green-50"
                            title={isPlaying ? "Pause" : "Play"}
                            type="button"
                        >
                          
                            {isPlaying ? <Icon icon="material-symbols:pause-outline-rounded" className="w-5 h-5" />  : <Icon icon="material-symbols:play-arrow" className="w-5 h-5" />}
                            
                        </Button>
                        <Button
                            onClick={clearRecording}
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            title="Delete recording"
                            type="button"
                        >
                            <Icon icon="material-symbols:delete-outline-rounded" className="w-5 h-5" />
                        </Button>
                    </>
                )}
            </div>

            {audioUrl && (
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onEnded={() => setIsPlaying(false)}
                    className="hidden"
                />
            )}
        </div>
    );
});

AudioRecorder.displayName = 'AudioRecorder';

export default AudioRecorder;