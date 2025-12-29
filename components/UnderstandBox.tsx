// components/UnderstandBox.tsx
import React, { useState } from "react";
import { UnderstandResponse } from "@/types/response_type";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  data: UnderstandResponse;
}

export default function UnderstandBox({ data }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-neutral-800/50 overflow-hidden transition-all duration-500">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-rose-500" />
              Client Message Interpretation
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Mode: Understand Client
            </p>
          </div>
          <div className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium shadow-lg">
            Understand Mode
          </div>
        </div>

        {/* Urdu Translation */}
        <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-8 rounded-2xl border border-purple-200/50 dark:border-purple-800/30">
          <p className="text-lg font-medium text-muted-foreground mb-4">
            Translation in Urdu
          </p>
          <p
            className="text-3xl font-bold text-right text-purple-800 dark:text-purple-300"
            dir="rtl"
          >
            {data.trans_ur}
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            <span className="font-medium">Roman Urdu:</span> {data.trans_roman}
          </p>
        </div>

        {/* Client Mood */}
        <div className="mb-8">
          <p className="text-lg font-medium text-foreground mb-4">
            Clients Mood / Tone
          </p>
          <div className="flex flex-wrap gap-3">
            {data.client_mood.map((mood, i) => (
              <span
                key={i}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 font-medium shadow-sm"
              >
                {mood}
              </span>
            ))}
          </div>
        </div>

        {/* Meaning in Roman Urdu */}
        <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-neutral-800/70 dark:to-neutral-900/70 p-8 rounded-2xl border border-slate-200/50 dark:border-neutral-700/50">
          <p className="text-lg font-medium text-foreground mb-4">
            Full Meaning & Context (in easy Roman Urdu)
          </p>
          <p className="text-xl leading-relaxed text-foreground/90 whitespace-pre-wrap">
            {data.meaning_roman}
          </p>

          <div className="flex justify-end mt-6">
            <Button
              size="lg"
              variant={copied ? "default" : "secondary"}
              className={cn(
                "shadow-md transition-all",
                copied && "bg-green-600 hover:bg-green-700"
              )}
              onClick={() => handleCopy(data.meaning_roman)}
            >
              {copied ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Copied Interpretation!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  Copy Interpretation
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
