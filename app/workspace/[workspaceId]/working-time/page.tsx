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

export default function WorkTimePage({
  params,
  searchParams,
}: {
  params: { day: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const date = new Date(
    `${searchParams?.year}-${searchParams?.month}-${searchParams?.day}`
  );
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
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

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full items-center p-5">
        <p className="text-3xl font-light">
          {weekDays[date.getDay()]}, {date.getDate()} {months[date.getMonth()]}
        </p>
      </div>
    </div>
  );
}
