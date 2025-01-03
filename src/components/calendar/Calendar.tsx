import DayCard from "./DayCard";
import { useState, useEffect } from "react";
import "./calendar.css";
import { Button } from "../ui/button";
import { useDay } from "@/context/dayContext";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import MonthYearPopover from "./MonthYearPopover";
import { weekDays, monthNames } from "@/lib/utils";

function Calendar() {
  const [currentDate] = useState<Date>(new Date());
  const [days, setDays] = useState<number>(0);
  const [firstDay, setFirstDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(currentDate.getMonth());
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const { selected, setSelectedDay } = useDay();

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
  }, [month, year]);

  const grid = [
    ...Array(firstDay).fill(0),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];

  function handleMonthChange(operation: string) {
    if (operation == "prev") {
      if (month == 0) {
        setMonth(11);
        setYear(year - 1);
      } else setMonth(month - 1);
    } else {
      if (month == 11) {
        setMonth(0);
        setYear(year + 1);
      } else setMonth(month + 1);
    }
  }

  return (
    <div className="calendar">
      <div className="flex justify-between m-2">
        <Button onClick={() => handleMonthChange("prev")}>
          <ChevronLeft />
          Previous
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <div className="bg-orange-100 px-8 border-2 border-black text-lg align-middle text-center">
              {monthNames[month]} - {year}
            </div>
          </PopoverTrigger>
          <MonthYearPopover
            setMonth={setMonth}
            year={year}
            setYear={setYear}
          />
        </Popover>
        <Button onClick={() => handleMonthChange("next")}>
          Next
          <ChevronRight />
        </Button>
      </div>
      <div className="header">
        {weekDays.map((day) => (
          <div key={day} className="day">
            {day}
          </div>
        ))}
      </div>
      <div className="days-grid">
        {grid.map((day: number, i: number) => (
          <DayCard
            key={i}
            day={day}
            isToday={
              currentDate.getFullYear() == year &&
              currentDate.getMonth() == month &&
              currentDate.getDate() == day
            }
            isSelected={
              selected.day == day &&
              selected.month == month &&
              selected.year == year
            }
            setSelectedDay={setSelectedDay}
            year={year}
            month={month}
          />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
