import ProjectItem from "@/components/projects/project-item";
import HelloWidget from "@/components/workspace/hello-widget";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import Image from "next/image";

export default function ProjectsPage() {
  return (
    <div className="h-full w-full flex flex-col">
      <SpaceNavbar spaceName="Projects"></SpaceNavbar>
      <div className="p-5 overflow-y-scroll">
        <div className="space-y-[1px] overflow-y-scroll shadow-lg bg-neutral-300">
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
          <ProjectItem project="s" />
        </div>
      </div>
    </div>
  );
}
