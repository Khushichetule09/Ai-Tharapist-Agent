"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const TOTAL_ROUNDS = 5;

export function BreathingGame() {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [progress, setProgress] = useState(0);
  const [round, setRound] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isComplete || isPaused) return;

    let timer: NodeJS.Timeout;

    if (phase === "inhale") {
      timer = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setPhase("hold");
            return 0;
          }
          return p + 2;
        });
      }, 100);
    } else if (phase === "hold") {
      timer = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setPhase("exhale");
            return 0;
          }
          return p + 4;
        });
      }, 100);
    } else {
      timer = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            if (round >= TOTAL_ROUNDS) {
              setIsComplete(true);
              return p;
            }
            setPhase("inhale");
            setRound((r) => r + 1);
            return 0;
          }
          return p + 2;
        });
      }, 100);
    }

    return () => clearInterval(timer);
  }, [phase, round, isComplete, isPaused]);

  const handleReset = () => {
    setPhase("inhale");
    setProgress(0);
    setRound(1);
    setIsComplete(false);
    setIsPaused(false);
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-green-500" />
        </motion.div>
        <h3 className="text-2xl font-semibold">Great job!</h3>
        <p className="text-muted-foreground text-center max-w-sm">
          You've completed {TOTAL_ROUNDS} rounds of breathing exercises. How do
          you feel?
        </p>
        <Button onClick={handleReset} className="mt-4">
          Start Again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-[400px] space-y-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="relative w-32 h-32 mx-auto">
            <motion.div
              animate={{
                scale: phase === "inhale" ? 1.5 : phase === "exhale" ? 1 : 1.2,
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="absolute inset-0 bg-primary/10 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Wind className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold">
            {phase === "inhale"
              ? "Breathe In"
              : phase === "hold"
              ? "Hold"
              : "Breathe Out"}
          </h3>
        </motion.div>
      </AnimatePresence>

      <div className="w-64">
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-2 text-center">
        <div className="text-sm text-muted-foreground">
          Round {round} of {TOTAL_ROUNDS}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? "Resume" : "Pause"}
        </Button>
      </div>
    </div>
  );
}
