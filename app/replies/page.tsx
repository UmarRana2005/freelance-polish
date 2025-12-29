"use client";

import { useState } from "react";
import { promptCategories } from "@/lib/prompts";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, CheckCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Prompts() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const selectedCategory = promptCategories.find(
    (cat) => cat.id === selectedId
  );

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#071029] dark:to-black p-8">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="relative text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Professional Communication Made Easy
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
              Freelancer Message Helper
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Never lose a client again due to poor English tone. Get
              ready-to-use, polite, and professional messages instantly.
            </p>
          </div>

          {/* Situation Selector */}
          <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 mb-10">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl">
                What situation are you facing?
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Select a common challenge to get professional message templates
              </CardDescription>
            </CardHeader>
            <CardContent className="px-10 pb-10">
              <Select value={selectedId || ""} onValueChange={setSelectedId}>
                <SelectTrigger className="w-full h-14 text-lg font-medium shadow-inner">
                  <SelectValue placeholder="Choose your current situation..." />
                </SelectTrigger>
                <SelectContent>
                  {promptCategories.map((cat) => (
                    <SelectItem
                      key={cat.id}
                      value={cat.id}
                      className="text-base py-3"
                    >
                      <div>
                        <div className="font-medium">{cat.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {cat.description}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Prompts Display */}
          {selectedCategory && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-3">
                  {selectedCategory.title}
                </h2>
                <p className="text-xl text-muted-foreground">
                  {selectedCategory.description}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
                {selectedCategory.prompts.map((prompt, index) => (
                  <Card
                    key={index}
                    className={cn(
                      "bg-white dark:bg-neutral-900/60 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2",
                      copiedIndex === index
                        ? "border-green-500/50 shadow-green-500/20"
                        : "border-transparent"
                    )}
                  >
                    <CardContent className="py-6 px-6 relative">
                      <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                        {prompt}
                      </p>
                      <Button
                        size="lg"
                        variant={
                          copiedIndex === index ? "default" : "secondary"
                        }
                        className={cn(
                          "absolute bottom-4 right-4 transition-all",
                          copiedIndex === index &&
                            "bg-green-600 hover:bg-green-700"
                        )}
                        onClick={() => handleCopy(prompt, index)}
                      >
                        {copiedIndex === index ? (
                          <>
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-5 h-5 mr-2" />
                            Copy Message
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
