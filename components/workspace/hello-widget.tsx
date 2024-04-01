"use client";

const HelloWidget = ({ name }: { name: string }) => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  let days = Math.floor((+currentDate - +startDate) / (24 * 60 * 60 * 1000));
  let currentWeek = Math.ceil(days / 7);
  let monthName = "";
  switch (currentDate.getMonth()) {
    case 0:
      monthName = "January";
      break;
    case 1:
      monthName = "February";
      break;
    case 2:
      monthName = "March";
      break;
    case 3:
      monthName = "April";
      break;
    case 4:
      monthName = "May";
      break;
    case 5:
      monthName = "June";
      break;
    case 6:
      monthName = "July";
      break;
    case 7:
      monthName = "August";
      break;
    case 8:
      monthName = "September";
      break;
    case 9:
      monthName = "October";
      break;
    case 10:
      monthName = "November";
      break;
    case 11:
      monthName = "December";
      break;
  }
  return (
    <div className="p-2 select-none">
      <h1 className="text-[5rem] leading-[1.2] font-semibold text-stone-600 dark:text-neutral-300">
        Hello {name.split(" ")[0]}
      </h1>
      <h2 className="text-5xl leading-[1.2] font-semibold text-stone-600/90 dark:text-neutral-300">
        It is {currentDate.getDate()}
        {String(currentDate.getDate()).charAt(
          String(currentDate.getDate()).length - 1,
        ) === "1" && <span className="text-3xl font-medium">st</span>}
        {String(currentDate.getDate()).charAt(
          String(currentDate.getDate()).length - 1,
        ) === "2" && <span className="text-3xl font-medium">nd</span>}
        {String(currentDate.getDate()).charAt(
          String(currentDate.getDate()).length - 1,
        ) === "3" && <span className="text-3xl font-medium">rd</span>}{" "}
        {monthName}
      </h2>
      <h2 className="text-5xl leading-[1.2] font-medium text-stone-600/90 dark:text-neutral-300">
        {currentWeek} CW
      </h2>
    </div>
  );
};

export default HelloWidget;
