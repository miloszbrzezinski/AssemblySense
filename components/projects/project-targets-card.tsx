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
import { Avatar, AvatarImage } from "../ui/avatar";
import { ProjectTarget, ProjectTargetType } from "@prisma/client";
import { Separator } from "../ui/separator";

interface ProjectTargetsCardProps {
  projectTarget: ProjectTarget[];
}

export const ProjectTargetsCard = ({
  projectTarget,
}: ProjectTargetsCardProps) => {
  const { onOpen } = useModal();

  return (
    <DashboardCard icon={<Target strokeWidth={1} />} title="Project targets">
      <div className="bg-stone-300 space-y-[1px]">
        {projectTarget.map((target) => (
          <div
            key={target.id}
            className="flex p-1 w-full bg-white space-x-[1px]  items-center select-none"
          >
            <div className="flex w-full min-h-14  items-center p-2 space-x-2 hover:bg-stone-100">
              {target.projectTargetType === ProjectTargetType.GENERAL && (
                <Target strokeWidth={1} className="min-w-9 h-9" />
              )}
              {target.projectTargetType === ProjectTargetType.WORKING_TIME && (
                <Timer strokeWidth={1} className="min-w-9 h-9" />
              )}
              {target.projectTargetType === ProjectTargetType.TIME && (
                <Hourglass strokeWidth={1} className="min-w-9 h-9" />
              )}
              {target.projectTargetType === ProjectTargetType.DATE && (
                <CalendarCheck strokeWidth={1} className="min-w-9 h-9" />
              )}
              <div>
                <div className="flex items-center space-x-1">
                  <p className="font-light text-lg whitespace-nowrap">
                    {target.name}
                  </p>
                </div>
                <p className="text-sm font-extralight text-stone-600 whitespace-nowrap">
                  {target.description}
                </p>
              </div>
              <Separator
                orientation="vertical"
                className="h-10 w-[1px] bg-stone-600"
              />
              {target.projectTargetType === ProjectTargetType.DATE && (
                <div className="border border-stone-500 rounded-md flex flex-col items-center justify-center">
                  <p className="p-2 text-2xl">{target.target.split("/")[0]}</p>
                  <p className="border-t w-full text-sm rounded-b-sm px-1 bg-red-900 text-white">
                    September
                  </p>
                </div>
              )}
              {target.projectTargetType === ProjectTargetType.TIME && (
                <div>
                  <p className="w-full text-xl">{target.target}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
