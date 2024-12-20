"use client";

import { ConferenceCard } from "@/components/ConferenceCard";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function CardPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const attendee = {
    id: Number(searchParams.get("id")),
    name: searchParams.get("name") || "",
    username: searchParams.get("username") || "",
    email: searchParams.get("email") || "",
    ticketNumber: searchParams.get("ticketNumber") || "",
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="relative w-full max-w-2xl mx-auto pt-24 px-4">
        <ConferenceCard attendee={attendee} />

        <div className="mt-8 text-center">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
