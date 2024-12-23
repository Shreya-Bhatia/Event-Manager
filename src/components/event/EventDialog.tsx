import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import AddEvent from "./AddEvent";
import EventList from "./EventList";

interface Props {
  day: number;
  month: number;
  year: number;
}

function EventDialog({ day, month, year }: Props) {
  const [currTab, setCurrTab] = useState<string>("events");

  return (
    <DialogContent className="max-w-fit">
      <DialogHeader>
        <DialogTitle>
          {currTab == "add" ? (
            "Add Event Details"
          ) : (
            <div className="flex justify-between mr-6 items-center">
              <div>
                Events on {day}-{month + 1}-{year}
              </div>
              <Button onClick={() => setCurrTab("add")}>Add Event</Button>
            </div>
          )}
        </DialogTitle>
      </DialogHeader>

      {currTab === "add" ? (
        <AddEvent setCurrTab={setCurrTab} day={day} month={month} year={year} />
      ) : (
        <EventList type="long" day={null} />
      )}
    </DialogContent>
  );
}

export default EventDialog;
