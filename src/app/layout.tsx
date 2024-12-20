import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conference Cards",
  description: "Generate conference cards for attendees",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1B2735_0%,#090A0F_100%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]">
            <div className="absolute inset-0 animate-grid-flow" />
          </div>

          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="aurora top-0 left-[-50%] bg-[radial-gradient(circle,#4CAF50,#2196F3,#9C27B0)]" />
            <div className="aurora bottom-[-50%] right-[-50%] bg-[radial-gradient(circle,#FF9800,#E91E63,#9C27B0)]" />
          </div>
          <div className="particles absolute inset-0 opacity-50">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={
                  {
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    "--x": `${(Math.random() - 0.5) * 400}px`,
                    "--y": `${(Math.random() - 0.5) * 400}px`,
                    "--duration": `${15 + Math.random() * 25}s`,
                    "--delay": `${-Math.random() * 20}s`,
                    "--particle-size": `${1 + Math.random() * 2}px`,
                    "--particle-color": `rgba(255,255,255,${
                      0.1 + Math.random() * 0.2
                    })`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>

        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
