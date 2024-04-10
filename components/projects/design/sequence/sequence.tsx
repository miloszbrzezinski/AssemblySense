import { StepItem } from "./step-item";

export const ProcessSequence = () => {
  return (
    <div className="flex flex-col overflow-y-scroll border bg-white p-5 shadow-lg">
      <StepItem />
      <StepItem />
      <StepItem />
      <StepItem />
      <div className="flex w-full items-center justify-center h-20">
        <button className="h-full w-72 border shadow-md font-light hover:bg-sky-900/20">
          New Step
        </button>
      </div>
    </div>
  );
};
