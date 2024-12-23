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

interface Props {
  day: number;
  month: number;
  year: number;
}

function EventDialog({ day, month, year }: Props) {
  const [currTab, setCurrTab] = useState<string>("events");
  const [startTime, setStartTime] = useState<string>("10:00");
  const [endTime, setEndTime] = useState<string>("11:00");

  return (
    <DialogContent className="max-w-fit">
      <DialogHeader>
        <DialogTitle>
          {currTab == "add" ? (
            "Add event details"
          ) : (
            <div>
              Events on {day}-{month}-{year}
            </div>
          )}
        </DialogTitle>
      </DialogHeader>
      {/* {currTab == "events" ?? div} */}

      {currTab === "add" ? (
        <AddEvent />
      ) : (
        <Button onClick={() => setCurrTab("add")}>Add</Button>
      )}
    </DialogContent>
  );
}

export default EventDialog;
