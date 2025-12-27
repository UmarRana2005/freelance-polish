"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Shuffle } from "lucide-react";

const LanguageToogle: React.FC = () => {
  const [isEnglishLeft, setIsEnglishLeft] = useState(true);
  const [animating, setAnimating] = useState(false);

  const handleToggle = () => {
    setAnimating(true);
    setIsEnglishLeft((s) => !s);
    // animation length should match CSS keyframes (500ms)
    window.setTimeout(() => setAnimating(false), 500);
  };

  const leftLabel = isEnglishLeft ? "English" : "Urdu";
  const rightLabel = isEnglishLeft ? "Urdu" : "English";

  return (
    <div className="inline-flex items-center gap-3 bg-white/60 dark:bg-black/30 backdrop-blur-sm rounded-full p-2 shadow-md">
      <div className="relative w-52 flex items-center justify-between px-2">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm transition-all duration-300 select-none ${
            isEnglishLeft
              ? "bg-primary text-primary-foreground font-semibold shadow"
              : "bg-transparent text-slate-700 dark:text-slate-200"
          } ${animating ? "animate-shuffle-left" : ""}`}
        >
          {leftLabel}
        </span>

        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm transition-all duration-300 select-none ${
            !isEnglishLeft
              ? "bg-primary text-primary-foreground font-semibold shadow"
              : "bg-transparent text-slate-700 dark:text-slate-200"
          } ${animating ? "animate-shuffle-right" : ""}`}
        >
          {rightLabel}
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle languages"
        title="Shuffle languages"
        onClick={handleToggle}
        className="rounded-full"
      >
        <Shuffle
          className={`h-5 w-5 text-slate-700 dark:text-slate-200 transition-transform duration-500 ${
            animating ? "rotate-180" : ""
          } hover:-translate-y-0.5 hover:scale-110`}
        />
      </Button>

      {/* Accessible status for screen readers */}
      <span className="sr-only" aria-live="polite">
        {isEnglishLeft
          ? "English left, Urdu right"
          : "Urdu left, English right"}
      </span>
    </div>
  );
};

export default LanguageToogle;
