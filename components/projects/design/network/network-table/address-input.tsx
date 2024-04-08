import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ProjectNetworkWithData } from "@/types";
import { FormEvent, useState } from "react";

interface NetworkAddressInputProps {
  profileId: string;
  workspaceId: string;
  projectNetwork: ProjectNetworkWithData;
}

export const NetworkAddressInput = ({
  profileId,
  workspaceId,
  projectNetwork,
}: NetworkAddressInputProps) => {
  const [maskFirst, setMaskFirst] = useState("");
  const [maskSecond, setMaskSecond] = useState("");
  const [maskThird, setMaskThird] = useState("");
  const [maskFourth, setMaskFourth] = useState("");

  const handleInputMastFirst = (event: FormEvent<HTMLInputElement>) => {
    setMaskFirst(event.currentTarget.value);
    if (parseInt(maskFirst) > 255) {
      setMaskFirst("255");
    }
  };
  return (
    <Popover>
      <PopoverTrigger className="text-base h-10 w-full flex items-center justify-start hover:bg-slate-200">
        <h3 className="text-base font-light pl-2">
          {projectNetwork.networkPortion}
        </h3>
      </PopoverTrigger>
      <PopoverContent className="rounded-none p-0 bg-white space-y-[1px] w-full">
        <div className="p-2">
          <h3 className="font-light pb-2">Subnet mask</h3>
          <div className="border">
            <input
              type="number"
              value={maskFirst}
              onChange={handleInputMastFirst}
              className={cn(
                "w-10 text-center text-lg",
                parseInt(maskFirst) > 255 && "bg-red-200",
              )}
            />
            <span>.</span>
            <input className="w-10 text-center text-lg" />
            <span>.</span>
            <input className="w-10 text-center text-lg" />
            <span>.</span>
            <input className="w-10 text-center text-lg" />
          </div>
        </div>
        <Separator />
        <div className="p-2">
          <h3 className="font-light pb-2">Network portion</h3>
          <div className="border">
            <input className="w-10 text-center text-lg" />
            <span>.</span>
            <input className="w-10 text-center text-lg" />
            <span>.</span>
            <input className="w-10 text-center text-lg" />
            <span className={cn(parseInt(maskFirst) !== 0 && "hidden")}>.</span>
            <input
              className={cn(
                "w-10 text-centertext-lg hide",
                parseInt(maskFirst) !== 0 && "hidden",
              )}
            />
          </div>
        </div>
        <Separator />
        <div className="w-full p-2 flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-stone-700">Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
