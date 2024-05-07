"use client";

import { Rocket } from "lucide-react";
import { DashboardCard } from "./dasboard-card";
import { useModal } from "@/hooks/use-modal-store";
import { ProjectStage } from "@prisma/client";
import { CalendarCard } from "../ui/calendar-card";
import { TimeDisplay } from "../ui/time-display";
import { cn } from "@/lib/utils";

interface ProjectStagesCardProps {
  projectStages: ProjectStage[];
}

export const ProjectStagesCard = ({
  projectStages,
}: ProjectStagesCardProps) => {
  const { onOpen } = useModal();

  const activeStageOrder = projectStages.filter((p) => p.active)[0]?.order;

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
                "h-10 items-center p-2 bg-stone-600 hover:scale-y-110 hover:shadow-md hover:shadow-stone-500",
              stage.order < activeStageOrder &&
                "h-10 items-center p-2 bg-slate-400 hover:scale-y-110 hover:shadow-md hover:shadow-stone-500"
            )}
          >
            <p>
              {stage.order + 1}. {stage.name}
            </p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
