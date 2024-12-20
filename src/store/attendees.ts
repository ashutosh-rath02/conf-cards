"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Attendee {
  id: number;
  name: string;
  username: string;
  email: string;
  ticketNumber: string;
}

interface AttendeeStore {
  attendees: Attendee[];
  setAttendees: (attendees: Attendee[]) => void;
  addAttendee: (attendee: Attendee) => void;
  clearAttendees: () => void;
}

export const useAttendeeStore = create<AttendeeStore>()(
  persist(
    (set) => ({
      attendees: [] as Attendee[],
      setAttendees: (attendees: Attendee[]) => set({ attendees }),
      addAttendee: (attendee: Attendee) =>
        set((state: AttendeeStore) => ({
          attendees: [...state.attendees, attendee],
        })),
      clearAttendees: () => set({ attendees: [] }),
    }),
    {
      name: "attendee-storage",
    }
  )
);
