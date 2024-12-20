"use client";

import { useState } from "react";

interface Attendee {
  id: number;
  name: string;
  username: string;
  email: string;
  ticketNumber: string;
}

export const ConferenceCard = ({ attendee }: { attendee: Attendee }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotation({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.2,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      className="relative h-80 cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute w-full h-full rounded-xl transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none transition-opacity duration-200"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgb(255,255,255,0.2) 0%, transparent 50%)`,
            }}
          />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="relative p-8 h-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-purple-600"></div>
              <span className="text-xl font-bold text-white">
                CONFERENCE 2024
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-3xl font-bold text-white mb-2">
                {attendee.name}
              </h2>
              <p className="text-gray-400 mb-4 text-lg">@{attendee.username}</p>
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="text-gray-400 text-sm">
                  <div className="text-base">JUNE 15-16</div>
                  <div>conference.example.com</div>
                </div>
                <div className="text-purple-500 font-mono text-lg">
                  {attendee.ticketNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
