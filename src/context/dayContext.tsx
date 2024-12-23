import React, { createContext, useState, ReactNode } from "react";
import { Day, DayContextType } from "../types/types";

let currDay: Date = new Date();
let today: Day = {
  day: currDay.getDate(),
  month: currDay.getMonth(),
  year: currDay.getFullYear(),
};
const DayContext = createContext<DayContextType | null>(null);

const DayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDay, setSelectedDay] = useState<Day>(today);

  return (
    <DayContext.Provider value={{ selected: selectedDay, setSelectedDay }}>
      {children}
    </DayContext.Provider>
  );
};

const useDay = () => {
  const context = React.useContext(DayContext);
  if (!context) {
    throw new Error("useDay must be used within an DayProvider");
  }
  return context;
};

export { DayProvider, useDay };
