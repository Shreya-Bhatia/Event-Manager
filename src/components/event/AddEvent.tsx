import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TimeInput } from "@nextui-org/date-input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Event } from "../../types/types";
import { parseTime, Time } from "@internationalized/date";
import { Alert } from "@nextui-org/react";
import { v4 } from "uuid";
import { useEvents } from "@/context/eventContext";

interface Props {
  setCurrTab: Function;
  day: number;
  month: number;
  year: number;
  eventSelected: Event | null;
}

function AddEvent({ setCurrTab, day, month, year, eventSelected }: Props) {
  const [event, setEvent] = useState<Event>(
    eventSelected
      ? eventSelected
      : {
          id: v4(),
          name: "",
          description: "",
          startTime: parseTime("01:00"),
          endTime: parseTime("02:00"),
          day: day,
          month: month,
          year: year,
        }
  );

  const [error, setError] = useState<any>(null);
  const { addEvent, editEvent } = useEvents();

  function updateEvent(key: keyof Event, value: Time | string | null) {
    setEvent((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function clientValidation(event: Event): boolean {
    if (!event.name.trim()) {
      setError("Please fill the name");
      return false;
    }
    if (event.startTime >= event.endTime) {
      setError("Start time must be less than End time !");
      return false;
    }
    return true;
  }

  function handleEvent() {
    if (!clientValidation(event)) return;
    try {
      if (eventSelected) editEvent(event);
      else addEvent(event);
    } catch (error) {
      setError(error);
      return;
    }
    setError(null);
    setCurrTab("events");
  }

  return (
    <div className="grid gap-4 py-4">
      {error && <Alert color="danger" title={error} description="" />}
      <div className="grid grid-rows-2 items-center">
        <Label>Name</Label>
        <Input
          value={event.name}
          onChange={(e) => updateEvent("name", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 items-center gap-4">
        <TimeInput
          isRequired
          label="Start Time"
          value={event.startTime}
          onChange={(value) => updateEvent("startTime", value)}
          labelPlacement="outside"
          variant="bordered"
        />
        <TimeInput
          isRequired
          label="End Time"
          value={event.endTime}
          onChange={(value) => updateEvent("endTime", value)}
          labelPlacement="outside"
          variant="bordered"
        />
      </div>
      <div className="grid grid-cols-[400px] gap-2 items-center">
        <Label>Description</Label>
        <Textarea
          placeholder="Type your description here."
          value={event.description}
          onChange={(e) => updateEvent("description", e.target.value)}
        />
      </div>
      <div className="flex justify-between">
        <Button variant="destructive" onClick={() => setCurrTab("events")}>
          Cancel
        </Button>
        <Button onClick={handleEvent}>
          {eventSelected ? "Update Event" : "Add Event"}
        </Button>
      </div>
    </div>
  );
}

export default AddEvent;
