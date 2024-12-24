import { Event } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkEventDay(event1: Event, event2: Event): boolean {
  return (
    event1.day == event2.day &&
    event1.month == event2.month &&
    event1.year == event2.year
  );
}

// checks whether event 2 occurs at time of event 1
export function checkEventTime(event1: Event, event2: Event): boolean {
  // case 1 : event 2 starts during event 1
  if (event1.startTime <= event2.startTime && event1.endTime >= event2.startTime)
    return true;
  // case 2 : event 2 starts before event 1 but ends during event 1 or after event 1
  if (event1.startTime >= event2.startTime && event1.startTime < event2.endTime)
    return true;

  return false;
}
