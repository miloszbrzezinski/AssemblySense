import { Separator } from "@/components/ui/separator";
import { OctagonPause } from "lucide-react";

export const StepSeparatorDocs = () => {
  return (
    <div className="flex flex-col w-2/6 h-48 items-center justify-center">
      <div className="flex w-full h-full justify-center">
        <Separator
          orientation="vertical"
          className="bg-stone-400 dark:bg-white"
        />
      </div>
      <div className="flex w-full h-8 pl-8 items-center justify-end">
        <OctagonPause strokeWidth={1.5} className="text-sky-500 w-8 h-8" />
        <div className="flex w-1/2 h-[1.5px] bg-sky-500" />
      </div>
      <div className="flex w-full h-full justify-center">
        <Separator
          orientation="vertical"
          className="bg-stone-400 dark:bg-white"
        />
      </div>
    </div>
  );
};
