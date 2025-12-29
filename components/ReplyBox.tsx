// components/ReplyBox.tsx
import React, { useState } from "react";
import { ReplyResponse } from "@/types/response_type";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, CheckCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  data: ReplyResponse;
}

export default function ReplyBox({ data }: Props) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-neutral-800/50 overflow-hidden transition-all duration-500">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              Tone Analysis & Suggestions
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Mode: Professional Reply
            </p>
          </div>
          <div className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg">
            Reply Mode
          </div>
        </div>

        {/* Tone Analysis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 p-6 rounded-2xl border border-red-200/50 dark:border-red-800/30">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Current Tone Detected
            </p>
            <p className="text-xl font-semibold text-red-700 dark:text-red-400">
              {data.analysis.current_tone}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-6 rounded-2xl border border-green-200/50 dark:border-green-800/30">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Recommended Fix
            </p>
            <p className="text-xl font-semibold text-green-700 dark:text-green-400">
              {data.analysis.fix}
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Suggested Replies */}
        <div>
          <h4 className="text-2xl font-bold mb-6 text-foreground">
            Suggested Professional Replies
          </h4>
          <div className="space-y-6">
            {data.options.map((opt, idx) => (
              <div
                key={idx}
                className={cn(
                  "group relative bg-white dark:bg-neutral-950/70 rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                  copiedIndex === idx
                    ? "border-green-500/50 shadow-green-500/20"
                    : "border-transparent"
                )}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                      {opt.style}
                    </div>
                    <p className="text-lg leading-relaxed text-foreground/90">
                      {opt.msg}
                    </p>
                    {opt.exp_ur && (
                      <p className="mt-4 text-sm italic text-muted-foreground border-t pt-4 border-dashed">
                        Urdu explanation: {opt.exp_ur}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button
                      size="lg"
                      variant={copiedIndex === idx ? "default" : "secondary"}
                      className={cn(
                        "min-w-32 shadow-md transition-all",
                        copiedIndex === idx && "bg-green-600 hover:bg-green-700"
                      )}
                      onClick={() => handleCopy(opt.msg, idx)}
                    >
                      {copiedIndex === idx ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5 mr-2" />
                          Copy Reply
                        </>
                      )}
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="min-w-32"
                      onClick={() => navigator.clipboard.writeText(opt.msg)}
                    >
                      Use This
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
