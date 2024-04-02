"use client";
import { cn } from "@/lib/utils";
import { ProjectWithCustomer } from "@/types";
import { Project } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const ProjectItem = ({ project }: { project: Project }) => {
  const router = useRouter();
  const onClick = () => {
    router.push(
      `/workspace/${project.workspaceId}/projects/${project.id}/dashboard`,
    );
  };
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
      </div>
      <div
        className={cn(
          "py-2 px-3 bg-gradient-to-t  text-neutral-100 font-normal rounded-full text-sm inline-flex items-center justify-center whitespace-nowrap w-8 md:w-auto h-8 transition-all",

          "from-emerald-600 to-emerald-500  dark:from-emerald-700 dark:to-emerald-800 ",
        )}
      >
        <p className="md:block hidden transition-all">{"Done"}</p>
      </div>
    </div>
  );
};

export default ProjectItem;
