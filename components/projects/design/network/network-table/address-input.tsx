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
import { FormEvent, useEffect, useState } from "react";

interface MaskStates {
  maskFirst: number[];
  maskSecond: number[];
  maskThird: number[];
  maskFourth: number[];
  ipFirst: number[];
  ipSecond: number[];
  ipThird: number[];
  ipFourth: number[];
}

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
  const [maskIndex, setMaskIndex] = useState(0);
  const [address, setAddress] = useState<MaskStates>({
    maskFirst: [],
    maskSecond: [],
    maskThird: [],
    maskFourth: [],
    ipFirst: [],
    ipSecond: [],
    ipThird: [],
    ipFourth: [],
  });

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      let element: keyof typeof address = "maskFirst";
      switch (maskIndex) {
        case 0:
          element = "maskFirst";
          break;
        case 1:
          element = "maskSecond";
          break;
        case 2:
          element = "maskThird";
          break;
        case 3:
          element = "maskFourth";
          break;
        case 4:
          element = "ipFirst";
          break;
        case 5:
          element = "ipSecond";
          break;
        case 6:
          element = "ipThird";
          break;
        case 7:
          element = "ipFourth";
          break;
      }
      if (Number(e.key) || Number(e.key) === 0) {
        const tmpMask = [...address[element], Number(e.key)];
        console.log(tmpMask.length);
        if (tmpMask.length < 4) {
          setAddress((prevAddress) => ({
            ...prevAddress,
            [element]: tmpMask,
          }));
        }
        if (tmpMask.length >= 3) {
          setMaskIndex((prevIndex) => prevIndex + 1);
        }
      }
      if (e.key === "Backspace") {
        const tmpMask = [...address[element]];
        const tmpMaskIndex = maskIndex;
        if (tmpMask.length === 0 && tmpMaskIndex > 0) {
          setMaskIndex((prevIndex) => prevIndex - 1);
        }
        if (tmpMask.length > 0) {
          tmpMask.pop();
          setAddress((prevAddress) => ({
            ...prevAddress,
            [element]: tmpMask,
          }));
        }
      }
      const tmpMaskIndex = maskIndex;
      if (
        (e.key === "Tab" ||
          e.key === "ArrowRight" ||
          e.key === "ArrowDown" ||
          e.key === "Enter") &&
        tmpMaskIndex < 7
      ) {
        setMaskIndex((prevIndex) => prevIndex + 1);
      }
      if ((e.key === "ArrowLeft" || e.key === "ArrowUp") && tmpMaskIndex > 0) {
        setMaskIndex((prevIndex) => prevIndex - 1);
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    // clean up
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [maskIndex, address]);

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
          <div className="flex">
            <div
              onClick={() => setMaskIndex(0)}
              className={cn(
                "flex w-10 h-6 hover:bg-slate-100 text-lg items-center justify-center",
                maskIndex === 0 && "bg-slate-200",
              )}
            >
              {address.maskFirst}
            </div>

            <span>.</span>
            <div
              onClick={() => setMaskIndex(1)}
              className={cn(
                "flex w-10 h-6 hover:bg-slate-100 text-lg items-center justify-center",
                maskIndex === 1 && "bg-slate-200",
              )}
            >
              {address.maskSecond}
            </div>
            <span>.</span>
            <div
              onClick={() => setMaskIndex(2)}
              className={cn(
                "flex w-10 h-6 hover:bg-slate-100 text-lg items-center justify-center",
                maskIndex === 2 && "bg-slate-200",
              )}
            >
              {address.maskThird}
            </div>
            <span>.</span>
            <div
              onClick={() => setMaskIndex(3)}
              className={cn(
                "flex w-10 h-6 hover:bg-slate-100 text-lg items-center justify-center",
                maskIndex === 3 && "bg-slate-200",
              )}
            >
              {address.maskFourth}
            </div>
          </div>
        </div>
        <Separator />
        <div className="p-2">
          <h3 className="font-light pb-2">Network portion</h3>
          <div className="flex">
            <div
              onClick={() => setMaskIndex(4)}
              className={cn(
                "flex w-10 h-6 hover:bg-slate-100 text-lg items-center justify-center",
                maskIndex === 4 && "bg-slate-200",
              )}
            >
              {address.ipFirst}
            </div>

            <span>.</span>
            <div
              onClick={() => setMaskIndex(5)}
              className={cn(
                "flex w-10 h-6 hover:bg-slate-100 text-lg items-center justify-center",
                maskIndex === 5 && "bg-slate-200",
              )}
            >
              {address.ipSecond}
            </div>
            <span>.</span>
            <div
              onClick={() => setMaskIndex(6)}
              className={cn(
                "flex w-10 h-6 hover:bg-slate-100 text-lg items-center justify-center",
                maskIndex === 6 && "bg-slate-200",
              )}
            >
              {address.ipThird}
            </div>
            <span>.</span>
            <div
              onClick={() => setMaskIndex(7)}
              className={cn(
                "flex w-10 h-6 hover:bg-slate-100 text-lg items-center justify-center",
                maskIndex === 7 && "bg-slate-200",
              )}
            >
              {address.ipFourth}
            </div>
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
