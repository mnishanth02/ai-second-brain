import React from "react";
import Link from "next/link";
import { Brain, MessageSquare, Upload } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-secondary-foreground sm:text-5xl md:text-6xl">
          Your AI-Powered Second Brain
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-secondary-foreground sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
          Upload, organize, and chat with your documents and notes using advanced AI technology.
        </p>
        <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              href={"/dashboard"}
              className={cn("flex w-full items-center justify-center", buttonVariants())}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="mr-2" /> Upload Anything
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Easily upload documents, notes, and any type of data to your AI Second Brain.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2" /> Chat with Your Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Have conversations with your uploaded content using our advanced AI chat interface.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2" /> AI-Powered Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Gain valuable insights and connections from your data through AI analysis.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
