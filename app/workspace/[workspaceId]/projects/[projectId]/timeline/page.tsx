import { startOfWeek, add, eachDayOfInterval } from "date-fns";

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

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-5">
        <div
          className="weeks-container"
          style={{ display: "flex", overflowX: "auto" }}
        >
          {weeks.map((week, index) => (
            <div key={index} className="week" style={{ minWidth: "100px" }}>
              {week.map((day) => (
                <div key={day.toString()} className="day">
                  {day.getDate()}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
