"use client";
import { cn } from "@/lib/utils";
import { ProjectWithCustomer } from "@/types";
import { Project } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const ProjectItem = ({ project }: { project: ProjectWithCustomer }) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`projects/${project.id}/dashboard`);
  };
  let activeStage = project.projectStages.filter((s) => s.active)[0];
  return (
    <div
      onClick={onClick}
      className="group bg-white h-16 items-center justify-between flex p-5 hover:bg-slate-50 dark:bg-neutral-900 dark:hover:bg-neutral-900/80 select-none"
    >
      <div>
        <p className="text-xl space-x-2">
          <span className="font-light">{project.projectNo}</span>
          <span>{project.name}</span>
        </p>
        <p className="font-extralight">{project.customer.name}</p>
      </div>
      <div
        className={cn(
          "py-2 px-3 text-stone-800 font-normal rounded-full text-sm inline-flex items-center justify-center whitespace-nowrap w-auto h-8 transition-all",
          "border"
        )}
      >
        <p className="transition-all">{activeStage && activeStage.name}</p>
      </div>
    </div>
  );
};

export default ProjectItem;
