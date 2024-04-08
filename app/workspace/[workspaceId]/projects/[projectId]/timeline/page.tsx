import {
  startOfWeek,
  add,
  eachDayOfInterval,
  getWeek,
  startOfDay,
  differenceInCalendarDays,
} from "date-fns";

export type CalendarEvent = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
};

const eventsForWeek = [
  {
    id: "sdf",
    title: "Event 1",
    startDate: new Date("April 7, 2024 03:24:00"),
    endDate: new Date("April 8, 2024 03:24:00"),
  } as CalendarEvent,
];

export default function ProjectTimelinePage() {
  const generateWeeks = (startDate: Date, numberOfWeeks: number) => {
    let weeks = [];

    for (let i = 0; i < numberOfWeeks; i++) {
      const start = add(startOfWeek(startDate), { weeks: i });
      const end = add(start, { days: 6 });
      const week = eachDayOfInterval({ start, end });
      weeks.push(week);
    }

    return weeks;
  };

  const currentDate = new Date();
  const weeks = generateWeeks(currentDate, 5);

  function clampDate(date: Date, start: Date, end: Date): Date {
    return new Date(
      Math.min(Math.max(date.getTime(), start.getTime()), end.getTime()),
    );
  }

  const calculateEventSpan = (
    event: CalendarEvent,
    weekStartDate: Date,
    weekEndDate: Date,
  ) => {
    const start = startOfDay(event.startDate);
    const end = startOfDay(event.endDate);
    const weekStart = startOfDay(weekStartDate);
    const weekEnd = startOfDay(weekEndDate);

    // Assuming you have a function to clamp the date within a range
    const clampedStart = clampDate(start, weekStart, weekEnd);
    const clampedEnd = clampDate(end, weekStart, weekEnd);

    console.log();

    return {
      offset: differenceInCalendarDays(clampedStart, weekStart), // Days from start of week to event start
      span: differenceInCalendarDays(clampedEnd, clampedStart) + 1, // Total days event spans, inclusive
    };
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-5 h-full">
        <div className="h-full">
          <div className="flex space-x-1 h-full z-40">
            {weeks.map((week, index) => (
              <div
                key={index}
                className="relative flex flex-col space-y-[0.5px] h-full bg-stone-200"
                style={{ minWidth: "100px" }}
              >
                <div className="flex items-center justify-center bg-white text-stone-300">
                  <p>CW {getWeek(week[0]) - 1}</p>
                </div>
                <div className="flex space-x-[0.5px] h-full bg-stone-200">
                  {week.map((day) => (
                    <div
                      key={day.toString()}
                      className="flex flex-col bg-stone-300 space-y-[0.5px] min-w-10"
                    >
                      <div className="flex items-center justify-center w-full text-stone-300 bg-white">
                        <p className="font-light">{day.getDate()}</p>
                      </div>
                      <div className="flex w-full h-full bg-white"></div>
                    </div>
                  ))}
                  {eventsForWeek.map((event) => {
                    const { offset, span } = calculateEventSpan(
                      event,
                      week[0],
                      week[week.length - 1],
                    );
                    return (
                      <div
                        key={event.id}
                        className="absolute bg-lime-500/50 text-white"
                        style={{
                          left: `${offset * 2.5}rem`,
                          width: `${span * 2.52}rem`,
                          top: "60px", // Example offset from top
                          // Adjust height, top, etc. as necessary
                        }}
                      >
                        Event
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="relative bg-red-500 w-96 h-96">
        <div className="w-10 h-10 absolute z-50 bg-blue-500 top-10 left-10"></div>
        <div className="w-20 h-20 absolute z-40 bg-green-500 top-10 left-10"></div>
      </div> */}
    </div>
  );
}
