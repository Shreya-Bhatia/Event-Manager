import "./calendar.css";

interface Props {
  day: number;
}

function DayCard({ day }: Props) {
  return <div className="day-card">{day == 0 ? "" : day}</div>;
}

export default DayCard;
