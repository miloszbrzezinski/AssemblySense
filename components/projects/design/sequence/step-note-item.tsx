import { StickyNote } from "lucide-react";

export const StepNote = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex border h-min p-1 items-center space-x-1 justify-start">
        <StickyNote strokeWidth={1} className="text-stone-300" />
        <p className="font-extralight text-stone-300">Step 1 Note</p>
      </div>
      <textarea className="flex w-full resize-none min-h-80 max-h-80 border p-1 focus:outline-none focus:rounded-none focus:bg-slate-200 focus:text-slate-500 text-stone-400" />
    </div>
  );
};
