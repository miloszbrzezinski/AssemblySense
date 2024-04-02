import Timer from "@/components/timer";
import HelloWidget from "@/components/workspace/hello-widget";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import Image from "next/image";

export default function WorkTimePage() {
  return (
    <div className="h-full w-full flex flex-col">
      <SpaceNavbar spaceName="Working time"></SpaceNavbar>
      <div className="flex h-full items-center justify-center">
        <Timer duration={1} />
      </div>
    </div>
  );
}
