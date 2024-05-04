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
                <Target strokeWidth={1} className="min-w-11 h-11" />
              )}
              {target.projectTargetType === ProjectTargetType.WORKING_TIME && (
                <Timer strokeWidth={1} className="min-w-11 h-11" />
              )}
              {target.projectTargetType === ProjectTargetType.TIME && (
                <Hourglass strokeWidth={1} className="min-w-11 h-11" />
              )}
              {target.projectTargetType === ProjectTargetType.DATE && (
                <CalendarCheck strokeWidth={1} className="min-w-11 h-11" />
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
              <p className="w-full text-xl">{target.target}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
