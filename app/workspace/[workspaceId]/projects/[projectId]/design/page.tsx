import ProjectItem from "@/components/projects/project-item";
import ProjectNavbar from "@/components/projects/project-navbar";
import HelloWidget from "@/components/workspace/hello-widget";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import Image from "next/image";

export default function ProjectDesignPage() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-5">
        <div className="space-y-[1px] bg-neutral-700">
          <div className="w-full h-40 bg-white">Root</div>
          <div className="w-full h-40 flex space-x-[1px]">
            <div className="w-full h-full space-y-[1px] bg-neutral-700">
              <div className="w-full h-1/5 bg-white">Group</div>
              <div className="w-full h-4/5 flex space-x-[1px]">
                <div className="w-full h-full bg-white">Process</div>
                <div className="w-full h-full bg-white">Process</div>
                <div className="w-full h-full bg-white">Process</div>
              </div>
            </div>
            <div className="w-full h-full space-y-[1px] bg-neutral-700">
              <div className="w-full h-1/5 bg-white">Group</div>
              <div className="w-full h-4/5 flex space-x-[1px]">
                <div className="w-full h-full bg-white">Process</div>
                <div className="w-full h-full bg-white">Process</div>
                <div className="w-full h-full bg-white">Process</div>
              </div>
            </div>
            <div className="w-full h-full space-y-[1px] bg-neutral-700">
              <div className="w-full h-1/5 bg-white">Group</div>
              <div className="w-full h-4/5 flex space-x-[1px]">
                <div className="w-full h-full bg-white">Process</div>
                <div className="w-full h-full bg-white">Process</div>
                <div className="w-full h-full bg-white">Process</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
