"use client";

import { Check, Circle, Rocket, X } from "lucide-react";
import { DashboardCard } from "./dasboard-card";
import { useModal } from "@/hooks/use-modal-store";
import { ProjectStage } from "@prisma/client";
import { CalendarCard } from "../../ui/calendar-card";
import { TimeDisplay } from "../../ui/time-display";
import { cn } from "@/lib/utils";

interface ProjectStagesCardProps {
  projectStages: ProjectStage[];
}

export const ProjectStagesCard = ({
  projectStages,
}: ProjectStagesCardProps) => {
  const { onOpen } = useModal();

  const activeStage = projectStages.filter((p) => p.active)[0];
  const activeStageOrder = activeStage?.order;

  let activeStageStartDate = "";
  let activeStageDeadline = "";

  if (activeStage.startDate) {
    const d = activeStage.startDate;
    const year = d.getFullYear();
    const month = d.getMonth() < 10 ? `0${d.getMonth()}` : `${d.getMonth()}`;
    const day = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;

    activeStageStartDate = `${day}/${month}/${year}`;
  }

  if (activeStage.deadline) {
    const d = activeStage.deadline;
    const year = d.getFullYear();
    const month = d.getMonth() < 10 ? `0${d.getMonth()}` : `${d.getMonth()}`;
    const day = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;

    activeStageDeadline = `${day}/${month}/${year}`;
  }

  return (
    <DashboardCard icon={<Rocket strokeWidth={1} />} title="Project stages">
      <div className="space-x-[1px] flex h-60 items-center">
        {projectStages.map((stage) => (
          <div
            className={cn(
              "w-full flex transition-all duration-200 bg-slate-400",
              stage.active &&
                "h-40 bg-white-500 border rounded-md hover:scale-y-105 shadow-md",
              stage.order > activeStageOrder &&
                "h-10 items-center p-2 bg-stone-800/80 hover:scale-y-110 hover:shadow-md hover:shadow-stone-500 text-stone-200",
              stage.order < activeStageOrder &&
                "h-10 items-center p-2 bg-green-800/50 text-green-50 hover:scale-y-110 hover:shadow-md hover:shadow-stone-500"
            )}
          >
            {!stage.active && (
              <div className="flex justify-between w-full">
                <p>
                  {stage.order + 1}. {stage.name}
                </p>
                {stage.order > activeStageOrder && <Circle />}
                {stage.order < activeStageOrder && <Check />}
              </div>
            )}
            {stage.active && (
              <div className="p-2">
                <p className="text-xl">
                  {stage.order + 1}. {stage.name}
                </p>
                {stage.startDate && (
                  <p className="font-light">
                    Start date: {activeStageStartDate}
                  </p>
                )}
                {stage.startDate && (
                  <p className="font-light">Deadline: {activeStageDeadline}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
