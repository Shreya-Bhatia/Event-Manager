import React, { createContext, useState, ReactNode } from "react";
import { Event, EventsContextType } from "../types/types";
import { parseTime } from "@internationalized/date";
import { checkEventDay, checkEventTime } from "@/lib/utils";

const EventContext = createContext<EventsContextType | undefined>(undefined);

const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  let storedEvent: Event[] = [];

  const eventsString = localStorage.getItem("events");
  if (eventsString) {
    let storedEventCopy: Event[] = JSON.parse(eventsString);
    storedEvent = storedEventCopy.map((event) => ({
      ...event,
      startTime: parseTime(event.startTime.toString()),
      endTime: parseTime(event.endTime.toString()),
    }));
  } else {
    localStorage.setItem("events", "[]");
  }

  const [events, setEvents] = useState<Event[]>(storedEvent);

  const syncLocalStorage = (updatedEvents: Event[]) => {
    const eventsToStore = updatedEvents.map((event) => ({
      ...event,
      startTime: event.startTime.toString(),
      endTime: event.endTime.toString(),
    }));
    localStorage.setItem("events", JSON.stringify(eventsToStore));
  };

  const checkEventCollision = (event: Event) => {
    events.forEach((eventStored) => {
      if (checkEventDay(eventStored, event)) {
        if (checkEventTime(eventStored, event)) {
          throw "Two Events can't be at same time !";
        }
      }
    });
  }

  const addEvent = (event: Event) => {
    checkEventCollision(event);
    setEvents((prev) => {
      const newEvents = [...prev, event];
      syncLocalStorage(newEvents);
      return newEvents;
    });
  };

  const editEvent = (updatedEvent: Event) => {
    checkEventCollision(updatedEvent);
    setEvents((prev) => {
      const newEvents = prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      );
      syncLocalStorage(newEvents);
      return newEvents;
    });
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => {
      const newEvents = prev.filter((event) => event.id !== id);
      syncLocalStorage(newEvents);
      return newEvents;
    });
  };

  return (
    <EventContext.Provider value={{ events, addEvent, editEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

const useEvents = () => {
  const context = React.useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};

export { EventProvider, useEvents };
