"use client";

import {
  CalendarCheck,
  Crown,
  Hourglass,
  Plus,
  ShipWheel,
  Target,
  Timer,
  Users,
} from "lucide-react";
import { DashboardCard } from "./dasboard-card";
import { useModal } from "@/hooks/use-modal-store";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { ProjectTarget, ProjectTargetType } from "@prisma/client";
import { Separator } from "../../ui/separator";
import { CalendarCard } from "../../ui/calendar-card";
import { TimeDisplay } from "../../ui/time-display";
import { useRouter } from "next/navigation";

interface ProjectTargetsCardProps {
  projectTarget: ProjectTarget[];
}

export const ProjectTargetsCard = ({
  projectTarget,
}: ProjectTargetsCardProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  return (
    <DashboardCard icon={<Target strokeWidth={1} />} title="Project targets">
      <div className="bg-stone-100 dark:bg-neutral-800 space-y-[1px]">
        {projectTarget.length === 0 && (
          <div className="bg-white dark:bg-neutral-950 text-center justify-center h-full flex flex-col py-10 text-2xl font-light">
            <p>No project targets</p>
            <button
              onClick={() => {
                router.push("settings/targets");
              }}
              className="underline text-lg"
            >
              add here
            </button>
          </div>
        )}
        {projectTarget.map((target) => (
          <div
            key={target.id}
            className="flex p-1 px-2 w-full min-h-20 bg-white dark:bg-neutral-950 space-x-[1px]  items-center justify-between select-none"
          >
            <div>
              <p className="font-light text-lg whitespace-nowrap">
                {target.name}
              </p>
              <p className="text-sm font-extralight text-stone-600 dark:text-neutral-400 whitespace-nowrap">
                {target.description}
              </p>
            </div>
            <div className="w-1/4">
              {target.projectTargetType === ProjectTargetType.GENERAL && (
                <p>{target.target}</p>
              )}
              {target.projectTargetType === ProjectTargetType.DATE && (
                <CalendarCard date={target.target} />
              )}
              {target.projectTargetType === ProjectTargetType.TIME && (
                <TimeDisplay time={target.target} />
              )}
              {target.projectTargetType === ProjectTargetType.WORKING_TIME && (
                <TimeDisplay time={target.target} />
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
