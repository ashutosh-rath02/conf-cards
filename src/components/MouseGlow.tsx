"use client";

import { useEffect, useState } from "react";

export const MouseGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    />
  );
};
