import "./calendar.css";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EventDialog from "../event/EventDialog";
import EventList from "../event/EventList";

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
          <EventList
            type="short"
            day={{ day: day, month: month, year: year }}
          />
        </div>
      </DialogTrigger>
      <EventDialog day={day} month={month} year={year} />
    </Dialog>
  );
}

export default DayCard;
