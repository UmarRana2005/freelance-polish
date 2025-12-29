// app/page.tsx
"use client";

import React, { useState } from "react";
import TextBox from "@/components/TextBox";
import ReplyBox from "@/components/ReplyBox";
import UnderstandBox from "@/components/UnderstandBox";
import { ContextEngineResponse } from "@/types/response_type";
import { Button } from "@/components/ui/button";
import { Sparkles, Send } from "lucide-react";

export default function Home() {
  const [lastMessage, setLastMessage] = useState<{
    message: string;
    mode: "reply" | "understand";
  } | null>(null);
  const [response, setResponse] = useState<ContextEngineResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend(payload: {
    message: string;
    mode: "reply" | "understand";
  }) {
    setLastMessage(payload);
    setResponse(null);
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/freelauncer_helper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Unexpected error from server");
        return;
      }

      setResponse(data as ContextEngineResponse);
    } catch (err) {
      setError("Network or server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-[#071029] dark:via-[#0d1b3a] dark:to-[#0f172a] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Your Freelance Communication Coach
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            FreelancePolish
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Turn informal or direct messages into{" "}
            <span className="font-medium text-foreground">
              polite, professional English
            </span>{" "}
            that builds trust and wins clients.
          </p>
        </div>

        {/* Main Interaction Card */}
        <div className="bg-white/80 dark:bg-neutral-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-neutral-800/50 overflow-hidden">
          <div className="p-8 sm:p-10">
            <TextBox onSend={handleSend} />

            {/* Status Bar */}
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3 text-sm">
                {loading ? (
                  <>
                    <div className="relative">
                      <div className="w-5 h-5 border-2 border-blue-500/30 rounded-full animate-spin"></div>
                      <Send className="w-3 h-3 absolute inset-0 m-auto text-blue-600 animate-pulse" />
                    </div>
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Thinking...
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">
                      Ready — type your message and send
                    </span>
                  </>
                )}
              </div>

              {error && (
                <div className="ml-auto bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-4 py-2 rounded-lg text-sm font-medium border border-red-200 dark:border-red-800">
                  {error}
                </div>
              )}
            </div>

            {/* Keyboard Tip */}
            <div className="mt-5">
              <p className="text-xs sm:text-sm text-muted-foreground bg-muted/50 dark:bg-neutral-800/50 px-4 py-3 rounded-lg inline-block">
                💡 Tip: Use{" "}
                <kbd className="px-2 py-1 bg-muted rounded text-xs">
                  Shift + Enter
                </kbd>{" "}
                for new line •{" "}
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd>{" "}
                to send
              </p>
            </div>
          </div>
        </div>

        {/* Response Area */}
        <div className="mt-10 transition-all duration-500 ease-out">
          {!response && !loading && !error && (
            <div className="text-center py-16">
              <div className="bg-gray-200/70 dark:bg-neutral-800/60 border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-2xl w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <Send className="w-12 h-12 text-muted-foreground/50" />
              </div>
              <p className="text-lg text-muted-foreground">
                Send a message above to get professional suggestions
              </p>
            </div>
          )}

          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white/70 dark:bg-neutral-900/60 backdrop-blur rounded-2xl p-6 shadow-lg animate-pulse"
                >
                  <div className="h-6 w-48 bg-muted rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-11/12"></div>
                    <div className="h-4 bg-muted rounded w-10/12"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {response?.mode === "reply" && <ReplyBox data={response} />}
          {response?.mode === "understand" && <UnderstandBox data={response} />}

          {response && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setResponse(null);
                  setLastMessage(null);
                  setError(null);
                }}
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                Start New Message
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
