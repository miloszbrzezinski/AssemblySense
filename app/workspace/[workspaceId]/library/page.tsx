import HelloWidget from "@/components/workspace/hello-widget";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import Image from "next/image";

export default function ComponentsLibraryPage() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex w-96 h-96">
        <Image src="/robot.svg" alt="Logo" width={1000} height={1000} />
      </div>
      <p className="text-6xl font-thin">Library empty</p>
    </div>
  );
}
