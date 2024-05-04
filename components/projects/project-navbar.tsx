"use client";

import { Button } from "@/components/ui/button";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Cog, Eye, Flag, MoreVertical, Replace, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";

import { cn } from "@/lib/utils";

import { HintButton } from "@/components/ui/hint-button";
import ProjectNavButton from "./project-nav-button";
import { Project } from "@prisma/client";

interface ProjectNavbarProps {
  profileId: string;
  project: Project;
  isFavourite: boolean;
}

const ProjectNavbar = ({
  profileId,
  project,
  isFavourite,
}: ProjectNavbarProps) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const { onOpen } = useModal();

  const onClick = () => {
    router.push(`/workspace/${params.workspaceId}/projects`);
  };

  const onClickChanges = async () => {
    onOpen("commitChanges", { profileId });
  };

  const onClickFavourite = async () => {};

  const onClickSettings = () => {
    router.push(
      `/workspace/${params.workspaceId}/projects/${params.projectId}/settings/general`
    );
  };

  const onClickDashboard = () => {
    router.push(
      `/workspace/${params.workspaceId}/projects/${params.projectId}/dashboard`
    );
  };

  return (
    <div className="flex flex-col w-full items-center h-24 bg-stone-50 dark:bg-zinc-900/30 dark:border-b-zinc-400 border-b-stone-500/30 shadow-sm border-b select-none">
      <div className="flex flex-row flex-grow w-full justify-between md:px-5 px-1">
        <div className="flex items-center h-12 text-2xl pt-2">
          {/* <Button
            onClick={onClick}
            variant="ghost"
            className="hidden md:block text-2xl ext-stone-900 dark:text-zinc-300 dark:hover:bg-zinc-700/50 font-medium px-2"
          >
            Projects
          </Button>
          <p className="hidden md:block text-stone-900 dark:text-zinc-300 font-extralight">
            /
          </p> */}
          <Button
            onClick={onClickDashboard}
            variant="ghost"
            className="md:text-2xl text-xl space-x-2 text-stone-900 dark:text-zinc-300 font-normal px-2"
          >
            <span>{project.projectNo}</span>
            <span className="font-light">{project.name}</span>
          </Button>
          {pathname.split("/")[5] === "settings" && (
            <>
              <p className="ext-stone-900 dark:text-zinc-300 font-extralight">
                /
              </p>
              <Button
                onClick={onClickSettings}
                variant="ghost"
                className="text-2xl text-stone-900 dark:text-zinc-300 font-light px-2"
              >
                Settings
              </Button>
            </>
          )}
        </div>
        <div className="flex space-x-5 md:items-end items-center transition-all">
          <div className="gap-2 flex">
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 block md:hidden transition-all outline-none">
                <MoreVertical className="h-5 w-5 select-none" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={onClickChanges}
                  className="space-x-2"
                >
                  <Replace strokeWidth={1.5} className="h-5 w-5" />
                  <p>Commit change</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onClickFavourite}
                  className="space-x-2"
                >
                  <Eye strokeWidth={1.5} className="h-5 w-5" />
                  <p>Follow</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onClickSettings}
                  className="space-x-2"
                >
                  <Cog strokeWidth={1.5} className="h-5 w-5" />
                  <p>Settings</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="group space-x-2 whitespace-nowrap md:block hidden transition-all">
            <HintButton
              onClick={onClickChanges}
              className={cn(
                !true &&
                  "bg-gradient-to-tl from-blue-500 to-blue-400 border-blue-300 dark:border-blue-400 text-white hover:shadow-sm shadow-lg dark:shadow-md shadow-blue-300 dark:shadow-blue-500 hover:text-white"
              )}
              description="Commit change"
              sideOffset={5}
            >
              <Replace strokeWidth={1.5} className="h-5 w-5" />
            </HintButton>
            <HintButton
              onClick={onClickFavourite}
              description="Follow"
              sideOffset={5}
              className={cn(
                "hover:bg-amber-600/70 hover:text-amber-50 dark:hover:bg-amber-700",
                isFavourite &&
                  "bg-amber-600/70 text-amber-50 dark:bg-amber-600/70 dark:text-amber-50"
              )}
            >
              <Eye strokeWidth={1.5} className="h-5 w-5" />
            </HintButton>
            <HintButton
              onClick={onClickSettings}
              description="Settings"
              sideOffset={5}
            >
              <Cog strokeWidth={1.5} className="h-5 w-5" />
            </HintButton>
          </div>
        </div>
      </div>
      <div className="flex px-5 pt-1 w-full">
        <ProjectNavButton type="dashboard" />
        <ProjectNavButton type="timeline" />
        <ProjectNavButton type="design" />
        <ProjectNavButton type="documentation" />
      </div>
    </div>
  );
};

export default ProjectNavbar;
