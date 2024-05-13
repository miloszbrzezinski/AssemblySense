import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  eachDayOfInterval,
  addMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, MoveLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthData = (date: Date) => {
    const startDay = startOfWeek(startOfMonth(date));
    const endDay = endOfWeek(endOfMonth(date));
    return eachDayOfInterval({ start: startDay, end: endDay });
  };

  const days = getMonthData(currentDate);
  const handlePrevMonth = () => {
    setCurrentDate(addMonths(currentDate, -1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="h-min">
      <div className="flex justify-between items-center p-4">
        <button
          onClick={handlePrevMonth}
          className="text-lg font-semibold hover:text-blue-500 focus:outline-none"
        >
          <ChevronLeft />
        </button>
        <h2 className="font-bold text-xl">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button
          onClick={handleNextMonth}
          className="text-lg font-semibold hover:text-blue-500 focus:outline-none"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="flex">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="min-w-12  max-w-12 w-12 text-sm font-semibold text-center"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 border-t">
        {days.map((day) => (
          <div
            key={day.toString()}
            className={cn(
              "min-w-12  max-w-12 w-12 min-h-12 flex items-center justify-center rounded-md hover:shadow-md hover:bg-slate-200 select-none",
              format(day, "MM") !== format(currentDate, "MM")
                ? "text-stone-400/60"
                : "text-stone-900"
            )}
          >
            <p>{format(day, "dd")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
