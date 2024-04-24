import { setProjectNetworkAddress } from "@/actions/project-network";
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
import { useRouter } from "next/navigation";
import { FormEvent, startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

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
  const router = useRouter();
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
    const tmpMask = projectNetwork.subnetMask.split(".");
    let tmpFirstMask = [0];
    if (tmpMask[0]) {
      tmpFirstMask = tmpMask[0].split("").map((e) => Number(e));
    }
    let tmpSecondMask = [0];
    if (tmpMask[0]) {
      tmpSecondMask = tmpMask[1].split("").map((e) => Number(e));
    }
    let tmpThirdMask = [0];
    if (tmpMask[0]) {
      tmpThirdMask = tmpMask[2].split("").map((e) => Number(e));
    }
    let tmpFourthMask = [0];
    if (tmpMask[0]) {
      tmpFourthMask = tmpMask[3].split("").map((e) => Number(e));
    }
    const tmpIp = projectNetwork.networkPortion.split(".");
    let tmpFirstIp = [0];
    if (tmpIp[0]) {
      tmpFirstIp = tmpIp[0].split("").map((e) => Number(e));
    }
    let tmpSecondIp = [0];
    if (tmpIp[1]) {
      tmpSecondIp = tmpIp[1].split("").map((e) => Number(e));
    }
    let tmpThirdIp = [0];
    if (tmpIp[2]) {
      tmpThirdIp = tmpIp[2].split("").map((e) => Number(e));
    }
    let tmpFourthIp = [0];
    if (tmpIp[3]) {
      tmpFourthIp = tmpIp[3].split("").map((e) => Number(e));
    }

    setAddress((prevAddress) => ({
      ...prevAddress,
      ["maskFirst"]: tmpFirstMask,
      ["maskSecond"]: tmpSecondMask,
      ["maskThird"]: tmpThirdMask,
      ["maskFourth"]: tmpFourthMask,
      ["ipFirst"]: tmpFirstIp,
      ["ipSecond"]: tmpSecondIp,
      ["ipThird"]: tmpThirdIp,
      ["ipFourth"]: tmpFourthIp,
    }));
  }, [projectNetwork.subnetMask, projectNetwork.networkPortion]);

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

  const onClick = () => {
    console.log(address.ipFirst.join().replaceAll(",", ""));
    const networkPortion = `${address.ipFirst.join().replaceAll(",", "")}.${address.ipSecond.join().replaceAll(",", "")}.${address.ipThird.join().replaceAll(",", "")}.${address.ipFourth.join().replaceAll(",", "")}`;
    const subnetMask = `${address.maskFirst.join().replaceAll(",", "")}.${address.maskSecond.join().replaceAll(",", "")}.${address.maskThird.join().replaceAll(",", "")}.${address.maskFourth.join().replaceAll(",", "")}`;
    startTransition(() => {
      setProjectNetworkAddress(
        profileId,
        workspaceId,
        projectNetwork,
        projectNetwork.projectId,
        subnetMask,
        networkPortion,
      ).then((data) => {
        // setError(data.error);
        if (data.success) {
          toast(data.success, {
            description: `Address modified}`,
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          router.refresh();
        }
      });
    });
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
                Number(address["maskFourth"]) === 0 && "hidden",
              )}
            >
              {address.ipFourth}
            </div>
          </div>
        </div>
        <Separator />
        <div className="w-full p-2 flex justify-between">
          <button
            onClick={onClick}
            className="bg-stone-700 text-white p-2 w-full"
          >
            Save
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
