import { PopoverContent } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { monthNames } from "@/lib/utils";

interface Props {
  year: number;
  setMonth: Function;
  setYear: Function;
}

function MonthYearPopover({ year, setMonth, setYear }: Props) {
  return (
    <PopoverContent className="w-80">
      <div className="bg-sky-200 flex justify-between items-center mb-2 rounded-md">
        <Button onClick={() => setYear(year - 1)}>
          <ChevronLeft />
        </Button>
        <span className="font-bold text-lg">{year}</span>
        <Button onClick={() => setYear(year + 1)}>
          <ChevronRight />
        </Button>
      </div>
      <div className="months">
        {monthNames.map((month, index) => (
          <div
            key={index}
            className="bg-sky-100 text-center border-1 border-black p-2 rounded-md hover:bg-teal-200"
            onClick={() => setMonth(index)}
          >
            {month.substring(0, 3)}
          </div>
        ))}
      </div>
    </PopoverContent>
  );
}

export default MonthYearPopover;
