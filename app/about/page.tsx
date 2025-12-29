// app/about/page.tsx
"use client";

import {
  Sparkles,
  Globe,
  MessageSquare,
  Users,
  Heart,
  Mail,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#071029] dark:to-black p-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="relative text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              About This Tool
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8 py-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
              Bridging the Communication Gap
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              This app was created to help talented freelancers from non-English
              speaking regions — especially in Asia — communicate confidently
              and professionally with international clients.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="bg-white dark:bg-neutral-900/60 border-transparent shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl">Global Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Millions of skilled freelancers in Pakistan, India,
                  Bangladesh, and beyond have amazing talent — but language
                  barriers often cause misunderstandings with Western clients.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-neutral-900/60 border-transparent shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-2xl">Tone Matters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Being too direct, informal, or unintentionally rude in English
                  can make clients uncomfortable — even when the work is
                  excellent. Many freelancers lose jobs without knowing why.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-neutral-900/60 border-transparent shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <CardTitle className="text-2xl">Empowering You</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This tool provides polite, professional, and culturally
                  appropriate message templates so you can focus on your skills
                  — not worry about wording.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Vision & Features */}
          <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Every freelancer deserves equal access to global opportunities —
                regardless of their native language. We believe clear,
                respectful communication should never be a barrier to success.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This is just the beginning. Future updates will include
                AI-powered rephrasing, Urdu/Roman Urdu input support, client
                message explanations, and more.
              </p>
            </div>

            <div className="grid gap-6">
              <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20">
                <CardHeader>
                  <Users className="w-10 h-10 text-primary mb-3" />
                  <CardTitle>Built for Asian Freelancers</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Especially designed with cultural nuances in mind for
                    freelancers from Pakistan, India, and surrounding regions.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardHeader>
                  <Sparkles className="w-10 h-10 text-primary mb-3" />
                  <CardTitle>Free & Open</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Completely free to use. No login, no limits. Made with love
                    for the freelance community.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center py-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl">
            <h2 className="text-4xl font-bold mb-6">
              Start Communicating Confidently Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Go back and choose a situation — copy a professional message and
              impress your clients.
            </p>
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/">← Back to Message Templates</Link>
            </Button>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-20 text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Have feedback or suggestions? Feel free to reach out on Twitter/X
              or GitHub.
            </p>
            <p className="mt-4 text-sm">
              Made with ❤️ for freelancers everywhere
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
