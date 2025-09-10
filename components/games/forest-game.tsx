"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TreePine, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

const MEDITATION_DURATION = 5 * 60; // 5 minutes in seconds

export function ForestGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MEDITATION_DURATION);
  const [audioElements] = useState({
    birds: new Audio("/sounds/birds.mp3"),
    wind: new Audio("/sounds/wind.mp3"),
    leaves: new Audio("/sounds/leaves.mp3"),
  });

  useEffect(() => {
    // Set up audio loops
    Object.values(audioElements).forEach((audio) => {
      audio.loop = true;
      audio.volume = volume / 100;
    });

    return () => {
      // Cleanup audio on unmount
      Object.values(audioElements).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  useEffect(() => {
    Object.values(audioElements).forEach((audio) => {
      audio.volume = volume / 100;
    });
  }, [volume]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress(
            ((MEDITATION_DURATION - newTime) / MEDITATION_DURATION) * 100
          );
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const togglePlay = () => {
    if (isPlaying) {
      Object.values(audioElements).forEach((audio) => audio.pause());
    } else {
      Object.values(audioElements).forEach((audio) => audio.play());
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-[400px] space-y-8">
      <div className="relative w-48 h-48">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-transparent rounded-full blur-xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <TreePine className="w-24 h-24 text-green-600" />
          </div>
        </motion.div>
      </div>

      <div className="w-64 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Volume</span>
            <span>{volume}%</span>
          </div>
          <div className="flex items-center gap-2">
            {volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
            />
          </div>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {formatTime(timeLeft)}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlay}
            className="rounded-full"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <span className="text-sm text-muted-foreground">
            {formatTime(MEDITATION_DURATION)}
          </span>
        </div>
      </div>
    </div>
  );
}
