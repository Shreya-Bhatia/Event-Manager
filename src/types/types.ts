import { Time } from "@internationalized/date";

export interface Event {
  id: string;
  name: string;
  description: string;
  startTime: Time;
  endTime: Time;
  day: number;
  month: number;
  year: number;
}

export interface EventsContextType {
  events: Event[];
  addEvent: (event: Event) => void;
  editEvent: (updatedEvent: Event) => void;
  deleteEvent: (id: string) => void;
}

export interface Day {
  day: number;
  month: number;
  year: number;
}

export interface DayContextType {
  selected: Day;
  setSelectedDay: (day: Day) => void;
}