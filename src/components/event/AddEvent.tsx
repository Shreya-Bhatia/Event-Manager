import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TimeInput } from "@nextui-org/date-input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Event } from "../../types/types";
import { parseTime, Time } from "@internationalized/date";

interface Props {
  setCurrTab: Function;
}

function AddEvent({ setCurrTab }: Props) {
  const [event, setEvent] = useState<Event>({
    name: "",
    description: "",
    startTime: parseTime("01:00"),
    endTime: parseTime("02:00"),
  });

  function updateEvent(key: keyof Event, value: Time | string | null) {
    setEvent((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div className="grid gap-4 py-4">
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
        <Button>Add</Button>
      </div>
    </div>
  );
}

export default AddEvent;
