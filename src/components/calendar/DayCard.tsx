import "./calendar.css";

interface Props {
  day: number;
  isToday: boolean;
}

function DayCard({ day, isToday }: Props) {
  return (
    <div className={isToday ? "day-card curr" : "day-card"}>
      {day == 0 ? "" : day}
    </div>
  );
}

export default DayCard;
