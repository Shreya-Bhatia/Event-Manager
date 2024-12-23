import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TimeInput } from "@nextui-org/date-input";
import { Textarea } from "@/components/ui/textarea";

function AddEvent() {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-rows-2 items-center">
        <Label htmlFor="event-name">Name</Label>
        <Input id="event-name" />
      </div>
      <div className="grid grid-cols-2 items-center gap-4">
        <TimeInput
          isRequired
          label="Start Time"
          labelPlacement="outside"
          variant="bordered"
        />
        <TimeInput
          isRequired
          label="End Time"
          labelPlacement="outside"
          variant="bordered"
        />
      </div>
      <div className="grid grid-cols-[400px] gap-2 items-center">
        <Label htmlFor="description">Description</Label>
        <Textarea placeholder="Type your description here." />
      </div>
      <div className="flex justify-between">
        <Button variant="destructive">Cancel</Button>
        <Button>Add</Button>
      </div>
    </div>
  );
}

export default AddEvent;
