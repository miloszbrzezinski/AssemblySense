import { StepItem } from "./step-item";

export const ProcessSequence = () => {
  return (
    <div className="flex flex-col overflow-y-scroll border bg-white p-5 shadow-lg w-full">
      <StepItem />
      <div className="flex w-full space-x-5 items-center h-20">
        <div className="w-1/5 flex" />
        <div className="w-4/5 flex h-full">
          <button className="h-full w-2/6 border shadow-md font-light hover:bg-sky-900/20">
            New Step
          </button>
        </div>
      </div>
    </div>
  );
};
