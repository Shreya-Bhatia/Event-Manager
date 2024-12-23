import "./calendar.css";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EventDialog from "../event/EventDialog";

interface Props {
  day: number;
  isToday: boolean;
  year: number;
  month: number;
}

function DayCard({ day, isToday, year, month }: Props) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={isToday ? "day-card curr" : "day-card"}
        >
          {day == 0 ? "" : day}
        </div>
      </DialogTrigger>
      <EventDialog day={day} month={month} year={year} />
    </Dialog>
  );
}

export default DayCard;
