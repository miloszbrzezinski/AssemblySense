import { Separator } from "@/components/ui/separator";
import { OctagonPause } from "lucide-react";

export const StepSeparator = () => {
  return (
    <div className="flex flex-col w-2/6 h-48 items-center justify-center">
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
  );
};
