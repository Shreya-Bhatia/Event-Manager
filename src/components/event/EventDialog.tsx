import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import AddEvent from "./AddEvent";
import EventList from "./EventList";
import { Event } from "@/types/types";

interface Props {
  day: number;
  month: number;
  year: number;
}

function EventDialog({ day, month, year }: Props) {
  const [currTab, setCurrTab] = useState<string>("events");
  const [event, setEvent] = useState<Event | null>(null);

  return (
    <DialogContent className="max-w-fit">
      <DialogHeader>
        <DialogTitle>
          {currTab == "Add" || currTab == "Edit" ? (
            currTab + " Event Details"
          ) : (
            <div className="flex justify-between mr-6 items-center">
              <div>
                Events on {day}-{month + 1}-{year}
              </div>
              <Button
                onClick={() => {
                  setCurrTab("Add");
                  setEvent(null);
                }}
              >
                Add Event
              </Button>
            </div>
          )}
        </DialogTitle>
      </DialogHeader>

      {currTab === "Add" || currTab == "Edit" ? (
        <AddEvent
          setCurrTab={setCurrTab}
          eventSelected={event}
          day={day}
          month={month}
          year={year}
        />
      ) : (
        <EventList
          type="long"
          day={null}
          setCurrTab={setCurrTab}
          setEvent={setEvent}
        />
      )}
    </DialogContent>
  );
}

export default EventDialog;
