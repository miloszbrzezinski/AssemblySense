interface CalendarCardProps {
  date: string;
}

export const CalendarCard = ({ date }: CalendarCardProps) => {
  const year = date.split("-")[0];
  let month = date.split("-")[1];
  switch (date.split("-")[1]) {
    case "01":
      month = "January";
      break;
    case "02":
      month = "February";
      break;
    case "03":
      month = "March";
      break;
    case "04":
      month = "April";
      break;
    case "05":
      month = "May";
      break;
    case "06":
      month = "June";
      break;
    case "07":
      month = "July";
      break;
    case "08":
      month = "August";
      break;
    case "09":
      month = "September";
      break;
    case "10":
      month = "October";
      break;
    case "11":
      month = "November";
      break;
    case "12":
      month = "December";
      break;
  }
  const day = date.split("-")[2];

  return (
    <div className="border w-full border-stone-500 rounded-md flex flex-col items-center justify-center">
      <p className="border-b text-center w-full text-sm rounded-t-sm px-1 bg-red-900 text-white">
        {month}
      </p>
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl">{day}</p>
        <p className="text-sm font-light">{year}</p>
      </div>
    </div>
  );
};
