import { setProjectComponentConnectionAddress } from "@/actions/component-connection";
import { setProjectNetworkAddress } from "@/actions/project-network";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ComponentConnectionWithData, ProjectComponentWithData, ProjectNetworkWithData } from "@/types";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface MaskStates {
  ipFirst: number[];
  ipSecond: number[];
  ipThird: number[];
  ipFourth: number[];
}

interface NetworkAddressInputProps {
  profileId: string;
  workspaceId: string;
  projectComponent: ProjectComponentWithData;
  connection: ComponentConnectionWithData;
}

export const NetworkAddressInput = ({
  profileId,
  workspaceId,
  projectComponent,
  connection,
}: NetworkAddressInputProps) => {
  const router = useRouter();
  const [maskIndex, setMaskIndex] = useState(0);
  const [address, setAddress] = useState<MaskStates>({
    ipFirst: [],
    ipSecond: [],
    ipThird: [],
    ipFourth: [],
  });

  useEffect(() => {
    const tmpIp = connection.projectNetwork.networkPortion.split(".");
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
      ["ipFirst"]: tmpFirstIp,
      ["ipSecond"]: tmpSecondIp,
      ["ipThird"]: tmpThirdIp,
      ["ipFourth"]: tmpFourthIp,
    }));
  }, [connection.projectNetwork.subnetMask, connection.projectNetwork.networkPortion]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      let element: keyof typeof address = "ipFirst";
      switch (maskIndex) {
        case 0:
          element = "ipFirst";
          break;
        case 1:
          element = "ipSecond";
          break;
        case 2:
          element = "ipThird";
          break;
        case 3:
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
    // startTransition(() => {
    //   setProjectComponentConnectionAddress(
    //     profileId,
    //     workspaceId,
    //     projectNetwork,
    //     projectNetwork.projectId,
    //     networkPortion,
    //   ).then((data) => {
    //     // setError(data.error);
    //     if (data.success) {
    //       toast(data.success, {
    //         description: `Address modified}`,
    //         action: {
    //           label: "Undo",
    //           onClick: () => console.log("Undo"),
    //         },
    //       });
    //       router.refresh();
    //     }
    //   });
    // });
  };

  return (
    <Popover>
      <PopoverTrigger className="text-base h-10 w-full flex items-center justify-start hover:bg-slate-200">
        <h3 className="text-base font-light pl-2">
          <span className="font-light">{connection.projectNetwork.networkPortion}</span>.<span className="font-normal">{connection.hostPortion}</span>
        </h3>
      </PopoverTrigger>
      <PopoverContent className="rounded-none p-0 bg-white space-y-[1px] w-full">
        <div className="p-2">
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
