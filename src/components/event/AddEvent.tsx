import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TimeInput } from "@nextui-org/date-input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  setCurrTab: Function;
}

function AddEvent({ setCurrTab }: Props) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-rows-2 items-center">
        <Label>Name</Label>
        <Input />
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
        <Label>Description</Label>
        <Textarea placeholder="Type your description here." />
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
