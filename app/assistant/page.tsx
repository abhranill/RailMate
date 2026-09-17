
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Bot,
  Send,
  TrainFront,
  UserRound,
  Sparkles,
} from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const quickQuestions = [
  "How can I check my PNR status?",
  "How do I find trains between two stations?",
  "What should I check before a long train journey?",
  "Help me plan a railway trip.",
];

function getDemoResponse(question: string) {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes("pnr")) {
    return "You can use the PNR Status page in RailMate to enter a 10-digit PNR. The current version is a demo and does not retrieve live booking information.";
  }

  if (
    lowerQuestion.includes("train") ||
    lowerQuestion.includes("station")
  ) {
    return "You can use RailMate's train search to select your departure and destination stations. The current train data is illustrative, so verify actual schedules through official railway services.";
  }

  if (
    lowerQuestion.includes("journey") ||
    lowerQuestion.includes("trip")
  ) {
    return "Start by selecting your departure station, destination, journey date, and budget in the Journey Planner. The current planner provides demo recommendations.";
  }

  if (
    lowerQuestion.includes("travel") ||
    lowerQuestion.includes("long")
  ) {
    return "For a long railway journey, check your ticket details, station, departure time, baggage, and essential travel items. Confirm live train information before departure.";
  }

  return "I'm RailMate AI's demo assistant. I can help you explore railway features, PNR information, and journey planning. A real AI model will be connected in a later version.";
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I'm RailMate AI. 🚆 How can I help you with your railway journey today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [nextId, setNextId] = useState(2);

  const sendMessage = (message?: string) => {
    const text = (message ?? input).trim();

    if (!text) return;

    const userMessage: Message = {
      id: nextId,
      role: "user",
      content: text,
    };

    const assistantMessage: Message = {
      id: nextId + 1,
      role: "assistant",
      content: getDemoResponse(text),
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
      assistantMessage,
    ]);

    setNextId((previous) => previous + 2);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <TrainFront size={22} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              RailMate <span className="text-blue-600">AI</span>
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back Home
          </Link>
        </div>
      </header>

      {/* Assistant Section */}
      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <Bot size={32} />
          </div>

          <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-blue-600">
            <Sparkles size={16} />
            RAILMATE INTELLIGENCE
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How can I help you?
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Your railway companion for exploring trains, planning journeys,
            and learning about railway travel.
          </p>
        </div>

        {/* Chat Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Bot size={21} />
            </div>

            <div className="flex-1">
              <h2 className="text-sm font-bold">RailMate Assistant</h2>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-500">
                  Demo Mode
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="min-h-[380px] space-y-5 p-5 sm:p-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.role === "user"
                    ? "flex-row-reverse"
                    : ""
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    message.role === "user"
                      ? "bg-slate-900 text-white"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {message.role === "user" ? (
                    <UserRound size={17} />
                  ) : (
                    <Bot size={17} />
                  )}
                </div>

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "rounded-tr-sm bg-blue-600 text-white"
                      : "rounded-tl-sm bg-slate-100 text-slate-700"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          <div className="border-t border-slate-100 px-5 py-5 sm:px-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Try asking
            </p>

            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendMessage(question)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-slate-100 bg-slate-50 p-4 sm:p-5">
            <div className="flex items-end gap-3">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask about Indian Railways..."
                rows={1}
                className="min-h-12 flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                aria-label="Send message"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={18} />
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-slate-400">
              Demo assistant · Not connected to a live AI model
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}