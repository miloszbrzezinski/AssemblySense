"use client";

import { cn } from "@/lib/utils";
import { redirect, useParams, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import {
  Banknote,
  BookMarked,
  CalendarRange,
  DraftingCompass,
  Frame,
  LayoutDashboard,
  LineChart,
} from "lucide-react";

interface ProjectNavButtonProps {
  type: String;
}

const ProjectNavButton = ({ type }: ProjectNavButtonProps) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  let Icon = null;
  let buttonName = null;
  switch (type) {
    case "dashboard": {
      Icon = LayoutDashboard;
      buttonName = "Dashboard";
      break;
    }
    case "design": {
      Icon = DraftingCompass;
      buttonName = "Design";
      break;
    }
    case "timeline": {
      Icon = CalendarRange;
      buttonName = "Timeline";
      break;
    }
    case "documentation": {
      Icon = BookMarked;
      buttonName = "Documentation";
      break;
    }
    default: {
      Icon = Frame;
      break;
    }
  }

  const onClick = () => {
    router.push(
      `/workspace/${params.workspaceId}/projects/${params.projectId}/${type}`,
    );
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group text-sm w-full md:w-min inline-flex items-center justify-center whitespace-nowrap px-1 p-2 rounded-t-md gap-x-2 border-b-4 border-transparent transition-all",
        pathname.split("/")[5] === type && " border-sky-800",
      )}
    >
      <Icon
        strokeWidth={1}
        className={cn(
          "flex-shrink-0 w-5 h-5 text-stone-500 dark:text-zinc-400",
          pathname.split("/")[5] === type && "text-sky-800 dark:text-sky-400",
        )}
      />
      <p
        className={cn(
          "text-stone-500 dark:text-zinc-400 hidden md:block transition-all",
          pathname.split("/")[5] === type && "text-sky-800 dark:text-sky-400",
        )}
      >
        {buttonName}
      </p>
    </button>
  );
};

export default ProjectNavButton;
