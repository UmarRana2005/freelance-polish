"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

interface ToggleThemeProps {
  className?: string;
}

const ToggleTheme: React.FC<ToggleThemeProps> = ({ className }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid rendering until client hydration to prevent mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = resolvedTheme ?? "light";
  const isLight = currentTheme === "light";

  // If a className is provided, we assume the caller manages positioning
  const positionClass = className ? "" : "absolute top-5 right-5";
  const baseClasses =
    "rounded-full bg-white shadow-md hover:scale-105 transition-transform";

  return (
    <Button
      size="icon"
      variant="ghost"
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      title={`Switch to ${isLight ? "dark" : "light"} theme`}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className={`${positionClass} ${baseClasses} ${className ?? ""}`.trim()}
    >
      <span
        className={`flex items-center justify-center w-full h-full text-current ${
          isLight ? "text-black" : "text-yellow-400"
        }`}
      >
        {isLight ? (
          <Moon className="h-4 w-4 transition-transform hover:-translate-y-0.5" />
        ) : (
          <Sun className="h-4 w-4 transition-transform animate-spin" />
        )}
      </span>
    </Button>
  );
};

export default ToggleTheme;
