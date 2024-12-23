import { useDay } from "@/context/dayContext";
import { useEvents } from "@/context/eventContext";
import { useEffect, useState } from "react";
import { Event } from "@/types/types";
import { Day } from "@/types/types";
import "./event.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

interface Props {
  type: string;
  day: Day | null;
  setCurrTab: Function;
  setEvent: Function;
}

function EventList({ type, day, setCurrTab, setEvent }: Props) {
  const { events, deleteEvent } = useEvents();
  const { selected } = useDay();
  const [currEvents, setCurrEvents] = useState<Event[]>([]);

  useEffect(() => {
    const dayUsed = day != null ? day : selected;
    const filteredEvents = events.filter((event) => {
      return (
        event.day == dayUsed.day &&
        event.month == dayUsed.month &&
        event.year == dayUsed.year
      );
    });
    setCurrEvents(filteredEvents);
  }, [events, selected, day]);

  function handleEditEvent(event: Event) {
    setCurrTab("Edit");
    setEvent(event);
  }

  return (
    <div
      className={
        type == "long"
          ? "w-[500px] grid gap-2 my-4 detailed-event"
          : "grid gap-0.5 smallevent"
      }
    >
      {currEvents.map((event) =>
        type == "short" ? (
          <div
            key={event.id}
            className="bg-emerald-200 rounded-lg text-base name font-normal"
          >
            {event.name}
          </div>
        ) : (
          <div
            key={event.id}
            className="bg-emerald-200 rounded-lg pl-4 grid gap-1"
          >
            <div className="flex justify-between">
              <div className="flex flex-col my-2 event-details">
                <span className="font-bold">{event.name}</span>{" "}
                <div className="description">{event.description}</div>
              </div>
              <div className="flex items-center">
                <div className="bg-emerald-100 px-2 mr-2 self-stretch flex items-center">
                  {event.startTime.toString()} -- {event.endTime.toString()}
                </div>
                <div
                  className="border-1 border-black hover:bg-green-400 rounded-lg px-2 py-1 mr-2"
                  onClick={() => handleEditEvent(event)}
                >
                  <MdEdit size={20} />
                </div>
                <div
                  className="border-1 border-black hover:bg-red-200 rounded-lg px-2 py-1 mr-2"
                  onClick={() => deleteEvent(event.id)}
                >
                  <MdDelete color="red" size={20} />
                </div>
              </div>
            </div>
          </div>
        )
      )}
      {currEvents.length == 0 && type == "long" && (
        <div className="bg-purple-200 p-4 text-center rounded-lg">
          No Events Found !
        </div>
      )}
    </div>
  );
}

export default EventList;
