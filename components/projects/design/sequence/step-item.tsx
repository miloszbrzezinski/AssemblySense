import { Separator } from "@/components/ui/separator";
import { Circle, OctagonPause, StickyNote } from "lucide-react";

export const StepItem = () => {
  return (
    <div className="flex space-x-5">
      <div>
        <div className="flex border h-min p-1 items-center space-x-1 justify-start">
          <StickyNote strokeWidth={1} className="text-stone-300" />
          <p className="font-extralight text-stone-300">Note</p>
        </div>
        <textarea className="flex w-72 resize-none min-h-80 max-h-80 border p-1 focus:outline-none focus:rounded-none focus:bg-slate-200 focus:text-slate-500 text-stone-400" />
      </div>

      <div className="flex flex-col w-min">
        <div className="flex flex-col border border-stone-400 w-72 h-48 bg-white shadow-md">
          <div className="flex w-full h-min p-1 items-center justify-center">
            <p>Step 1</p>
          </div>
          <Separator className="bg-stone-400" />
          <div className="flex flex-col space-y-[1px] w-full bg-stone-300">
            <div className="flex w-full h-8 bg-white p-2 items-center font-light">
              Z2000 to Home
            </div>
          </div>
        </div>
        <div className="flex w-min h-48">
          <div className="flex flex-col w-72 h-48 items-center justify-center">
            <div className="flex w-full h-full justify-center">
              <Separator orientation="vertical" className="bg-stone-400" />
            </div>
            <div className="flex w-full h-[1px] pl-20 items-center">
              <OctagonPause strokeWidth={1.5} className="text-sky-500" />
              <div className="flex w-full h-[1.5px] bg-sky-500" />
            </div>
            <div className="flex w-full h-full justify-center">
              <Separator orientation="vertical" className="bg-stone-400" />
            </div>
          </div>
          <div className="flex items-center w-72 h-48">
            <div className="text-base h-10 w-full flex items-center justify-start border border-sky-500 bg-white shadow-md hover:bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
