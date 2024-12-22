import DayCard from "./DayCard";
import { useState, useEffect } from "react";
import "./calendar.css";
import { Button } from "../ui/button";

function Calendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date("11-10-2024"));
  const [days, setDays] = useState<number>(0);
  const [firstDay, setFirstDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(currentDate.getMonth());
  const [year, setYear] = useState<number>(currentDate.getFullYear());

  const weekDays: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    function isLeapYear(year: number) {
      return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
    }

    if (month === 1) {
      setDays(isLeapYear(currentDate.getFullYear()) ? 29 : 28);
    } else if ([3, 5, 8, 10].includes(month)) {
      setDays(30);
    } else {
      setDays(31);
    }

    setFirstDay(new Date(year, month, 1).getDay());
  }, [month]);

  const grid = [
    ...Array(firstDay).fill(0),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];

  return (
    <div className="calendar">
      <div className="flex justify-between m-2">
        <Button>Previous</Button>
        <div className="bg-orange-100 px-8 border-2 border-black text-lg align-middle text-center">
          {monthNames[month]} - {year}
        </div>
        <Button>Next</Button>
      </div>
      <div className="header">
        {weekDays.map((day) => (
          <div className="day">{day}</div>
        ))}
      </div>
      <div className="days-grid">
        {grid.map((day) => (
          <DayCard day={day} />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
