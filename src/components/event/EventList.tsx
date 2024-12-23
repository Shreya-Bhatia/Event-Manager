import { useDay } from "@/context/dayContext";
import { useEvents } from "@/context/eventContext";
import { useEffect, useState } from "react";
import { Event } from "@/types/types";
import { Day } from "@/types/types";

interface Props {
  type: string;
  day?: Day;
}

function EventList({ type, day }: Props) {
  const { events } = useEvents();
  const { selected } = useDay();
  const [currEvents, setCurrEvents] = useState<Event[]>([]);

  useEffect(() => {
	const dayUsed = day ? day : selected;
    const filteredEvents = events.filter((event) => {
      return (
        event.day == dayUsed.day &&
        event.month == dayUsed.month &&
        event.year == dayUsed.year
      );
    });
    setCurrEvents(filteredEvents);
  }, [events, selected]);

  return (
    <div
      className={type == "long" ? "w-[500px] grid gap-2 my-4" : "grid gap-0.5 smallevent"}
    >
      {currEvents.map((event) =>
        type == "short" ? (
          <div
            key={event.id}
            className="bg-emerald-200 rounded-lg text-base name"
          >
            {event.name}
          </div>
        ) : (
          <div
            key={event.id}
            className="bg-emerald-200 rounded-lg px-4 py-2 grid gap-1"
          >
            <div className="flex justify-between">
              <span className="font-bold">{event.name}</span>
              <div className="bg-emerald-100 px-2">
                {event.startTime.toString()} -- {event.endTime.toString()}
              </div>
            </div>
            <div>{event.description}</div>
          </div>
        )
      )}
    </div>
  );
}

export default EventList;