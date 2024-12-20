"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Plus, Trash2, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAttendeeStore, Attendee } from "@/store/attendees";
import { MouseGlow } from "@/components/MouseGlow";

export default function Dashboard() {
  const router = useRouter();
  const { attendees, setAttendees, clearAttendees } = useAttendeeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--x", `${x}%`);
    e.currentTarget.style.setProperty("--y", `${y}%`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split("\n");

      const data = lines
        .slice(1)
        .map((line, index) => {
          const [name, username, email] = line.split(",");
          return {
            id: index,
            name: name?.trim() || "",
            username: username?.trim() || "",
            email: email?.trim() || "",
            ticketNumber: `#${String(index + 1).padStart(6, "0")}`,
          };
        })
        .filter((attendee) => attendee.name);

      setAttendees(data);
    };
    reader.readAsText(file);
  };

  const loadTestData = () => {
    const testData = [
      {
        id: 1,
        name: "John Doe",
        username: "john",
        email: "john@test.com",
        ticketNumber: "#000001",
      },
      {
        id: 2,
        name: "Jane Smith",
        username: "jane",
        email: "jane@test.com",
        ticketNumber: "#000002",
      },
    ];
    setAttendees(testData);
  };

  const handleViewCard = (attendee: Attendee) => {
    router.push(
      `/card/${attendee.id}?${new URLSearchParams({
        id: attendee.id.toString(),
        name: attendee.name,
        username: attendee.username,
        email: attendee.email,
        ticketNumber: attendee.ticketNumber,
      }).toString()}`
    );
  };

  const exportToCSV = () => {
    const headers = ["name,username,email,ticketNumber\n"];
    const csv = headers.concat(
      attendees
        .map(
          (attendee) =>
            `${attendee.name},${attendee.username},${attendee.email},${attendee.ticketNumber}`
        )
        .join("\n")
    );

    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "conference-attendees.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!mounted) return null;

  return (
    <>
      <MouseGlow />
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                Conference Cards Generator
              </h1>
              {attendees.length > 0 && (
                <div
                  className="glass-card gradient-border rounded-xl p-6"
                  onMouseMove={handleMouseMove}
                >
                  <div className="flex gap-4">
                    <button
                      onClick={exportToCSV}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      <Download size={16} />
                      Export CSV
                    </button>
                    <button
                      onClick={clearAttendees}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      <Trash2 size={16} />
                      Clear All
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 cursor-pointer">
                  <Plus size={16} />
                  Upload CSV
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={loadTestData}
                  className="px-4 py-2 bg-purple-600/50 text-white rounded-md hover:bg-purple-700"
                >
                  Load Test Data
                </button>
              </div>
            </div>

            {attendees.length > 0 && (
              <div className="bg-white/5 backdrop-blur-md rounded-lg shadow-2xl border border-white/10 p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Attendees List
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left p-2 text-white/80">Name</th>
                        <th className="text-left p-2 text-white/80">
                          Username
                        </th>
                        <th className="text-left p-2 text-white/80">Email</th>
                        <th className="text-left p-2 text-white/80">
                          Ticket #
                        </th>
                        <th className="text-left p-2 text-white/80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendees.map((attendee) => (
                        <tr
                          key={attendee.id}
                          className="border-b border-white/10"
                        >
                          <td className="p-2 text-white">{attendee.name}</td>
                          <td className="p-2 text-white/80">
                            @{attendee.username}
                          </td>
                          <td className="p-2 text-white/80">
                            {attendee.email}
                          </td>
                          <td className="p-2 text-white/80">
                            {attendee.ticketNumber}
                          </td>
                          <td className="p-2">
                            <button
                              onClick={() => handleViewCard(attendee)}
                              className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                            >
                              <ExternalLink size={16} />
                              View Card
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
