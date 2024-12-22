import DayCard from "./DayCard";
import { useState, useEffect } from "react";
import "./calendar.css";

function Calendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [days, setDays] = useState<number>(0);
  const [firstDay, setFirstDay] = useState<number>(0);

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  useEffect(() => {
    function isLeapYear(year: number) {
      return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
    }

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (month === 1) {
      setDays(isLeapYear(currentDate.getFullYear()) ? 29 : 28);
    } else if ([3, 5, 8, 10].includes(month)) {
      setDays(30);
    } else {
      setDays(31);
    }

    setFirstDay(new Date(year, month, 1).getDay());
  }, [currentDate]);

  return (
    <div className="calendar">
      <div className="header">
        {weekDays.map((day) => (
          <div className="day">{day}</div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
