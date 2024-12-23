import React, { createContext, useState, ReactNode } from "react";
import { Event, EventsContextType } from "../types/types";

const EventContext = createContext<EventsContextType | undefined>(undefined);

const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  let storedEvent: Event[] = [];

  const eventsString = localStorage.getItem("events");
  if (eventsString) {
    storedEvent = JSON.parse(eventsString);
  } else {
    localStorage.setItem("events", "[]");
  }

  const [events, setEvents] = useState<Event[]>(storedEvent);

  const syncLocalStorage = (updatedEvents: Event[]) => {
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const addEvent = (event: Event) => {
    setEvents((prev) => {
      const newEvents = [...prev, event];
      syncLocalStorage(newEvents);
      return newEvents;
    });
  };

  const editEvent = (updatedEvent: Event) => {
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
