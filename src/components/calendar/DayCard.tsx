import "./calendar.css";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EventDialog from "../event/EventDialog";

interface Props {
  day: number;
  isToday: boolean;
  year: number;
  month: number;
  isSelected: boolean;
  setSelectedDay: Function;
}

function DayCard({
  day,
  isToday,
  year,
  month,
  isSelected,
  setSelectedDay,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          onClick={() => setSelectedDay({ day: day, month: month, year: year })}
          className={
            "day-card" + (isToday ? " curr" : isSelected ? " selected" : "")
          }
        >
          {day == 0 ? "" : day}
        </div>
      </DialogTrigger>
      <EventDialog day={day} month={month} year={year} />
    </Dialog>
  );
}

export default DayCard;
