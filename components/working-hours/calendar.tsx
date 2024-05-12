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
    <div className="w-full mx-auto border shadow rounded-lg overflow-hidden">
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
      <div className="grid grid-cols-7">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="px-2 py-1 text-sm font-semibold text-center"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 border-t gap-1">
        {days.map((day) => (
          <div
            key={day.toString()}
            className={`w-12 h-12 flex items-center justify-center ${
              format(day, "MM") !== format(currentDate, "MM")
                ? "text-gray-400"
                : "text-gray-800"
            }`}
          >
            <p>{format(day, "dd")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
