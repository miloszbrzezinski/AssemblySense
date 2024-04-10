import { Separator } from "@/components/ui/separator";

export const StepActions = () => {
  return (
    <div className="flex flex-col border border-stone-400 w-2/6 h-48 bg-white shadow-md">
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
  );
};
