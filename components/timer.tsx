"use client";
import React, { useState, useEffect, useRef } from "react";

interface TimerProps {
  duration: number; // Duration in minutes
}

const Timer: React.FC<TimerProps> = ({ duration }) => {
  const durationInSeconds = duration * 60 * 1000; // Convert minutes to milliseconds
  const [elapsedTime, setElapsedTime] = useState(0);
  const animationFrameRef = useRef<number>(0);
  const startTimeRef = useRef<DOMHighResTimeStamp | null>(null);

  const updateProgress = (timestamp: DOMHighResTimeStamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;

    if (elapsed < durationInSeconds) {
      setElapsedTime(elapsed);
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    } else {
      setElapsedTime(durationInSeconds); // Ensure we don't go over the duration
    }
  };

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [durationInSeconds]);

  // Calculate progress percentage
  const progress = (elapsedTime / durationInSeconds) * 100;

  // SVG Circle progress logic
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = ((100 - progress) / 100) * circumference;

  return (
    <div className="relative w-96 h-96 flex justify-center items-center rounded-full text-lg font-semibold bg-stone-300/50 text-stone-600 dark:text-neutral-400">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r={radius.toString()}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset.toString()}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <span className="z-10">
        {Math.floor((elapsedTime / 3600000) % 60)}h{" "}
        {Math.floor((elapsedTime / 60000) % 60)}m
      </span>
    </div>
  );
};

export default Timer;
