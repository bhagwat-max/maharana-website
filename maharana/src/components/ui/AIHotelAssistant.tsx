"use client";

import {
  ExternalLink,
  LoaderCircle,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const welcomeMessage: Message = {
  id: "welcome",
  role: "assistant",
  text: "Welcome to The Maharana. I can help with rooms, prices, dining, experiences, booking, directions and contact details.",
};

const quickQuestions = [
  {
    label: "Room prices",
    question: "What room options and prices do you offer?",
  },
  {
    label: "Book a stay",
    question: "How can I book a stay?",
  },
  {
    label: "Directions",
    question: "How do I get directions to the hotel?",
  },
  {
    label: "Contact",
    question: "How can I contact the hotel?",
  },
];

function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const label = match[1];
    const href = match[2];
    const isSafe =
      href.startsWith("/") ||
      href.startsWith("https://maps.google.com/");

    if (isSafe) {
      const isExternal = href.startsWith("http");

      nodes.push(
        <a
          key={`${match.index}-${href}`}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1 font-medium text-brass-soft underline underline-offset-2"
        >
          {label}
          {isExternal && <ExternalLink size={12} aria-hidden="true" />}
        </a>
      );
    } else {
      nodes.push(label);
    }

    lastIndex = linkPattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes}</>;
}

export default function AIHotelAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function sendMessage(text: string) {
    const cleanText = text.trim();

    if (!cleanText || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text: cleanText,
    };

    const conversation = [...messages, userMessage];

    setMessages(conversation);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversation.map(({ role, text }) => ({
            role,
            text,
          })),
        }),
      });

      const data = (await response.json()) as {
        reply?: string;
        message?: string;
      };

      if (!response.ok || !data.reply) {
        throw new Error(data.message || "The assistant could not respond.");
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: data.reply as string,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "I’m sorry, I couldn’t answer right now. Please try again or visit [Contact](/contact).",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <section
          aria-label="The Maharana AI assistant"
          className="flex h-[min(70vh,600px)] w-[min(380px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-parchment/15 bg-ink shadow-2xl"
        >
          <header className="flex items-center justify-between border-b border-parchment/10 bg-ink-soft px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brass text-ink">
                <Sparkles size={18} aria-hidden="true" />
              </span>

              <div>
                <h2 className="font-display text-xl text-parchment">
                  Maharana Concierge
                </h2>
                <p className="text-[11px] uppercase tracking-[0.18em] text-brass-soft">
                  AI hotel assistant
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI assistant"
              className="flex h-9 w-9 items-center justify-center rounded-full text-parchment/70 transition-colors hover:bg-parchment/10 hover:text-parchment"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div
            className="flex-1 space-y-4 overflow-y-auto px-4 py-5"
            aria-live="polite"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "rounded-br-sm bg-brass text-ink"
                      : "rounded-bl-sm border border-parchment/10 bg-ink-soft text-parchment/85"
                  }`}
                >
                  <RichText text={message.text} />
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-parchment/10 bg-ink-soft px-4 py-3 text-sm text-parchment/70">
                  <LoaderCircle
                    size={16}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                  Thinking
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-parchment/10 px-4 pt-3">
            <div className="flex gap-2 overflow-x-auto pb-3">
              {quickQuestions.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  disabled={isLoading}
                  onClick={() => void sendMessage(item.question)}
                  className="shrink-0 rounded-full border border-brass/40 px-3 py-1.5 text-xs text-brass-soft transition-colors hover:bg-brass hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 border-t border-parchment/10 bg-ink-soft p-3"
          >
            <label htmlFor="maharana-ai-message" className="sr-only">
              Ask the hotel assistant
            </label>

            <textarea
              id="maharana-ai-message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();

                  if (input.trim() && !isLoading) {
                    void sendMessage(input);
                  }
                }
              }}
              maxLength={600}
              rows={1}
              placeholder="Ask about your stay..."
              className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-parchment/10 bg-ink px-4 py-3 text-sm text-parchment outline-none placeholder:text-parchment/40 focus:border-brass"
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brass text-ink transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={17} aria-hidden="true" />
            </button>
          </form>

          <p className="bg-ink-soft px-4 pb-3 text-center text-[10px] text-parchment/40">
            AI responses may require confirmation from the hotel.
          </p>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={isOpen}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-brass-soft/50 bg-brass text-ink shadow-xl transition-transform duration-300 hover:scale-110"
      >
        {isOpen ? (
          <X size={24} aria-hidden="true" />
        ) : (
          <MessageCircle size={24} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}