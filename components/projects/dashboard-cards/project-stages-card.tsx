"use client";

import { Check, Circle, Rocket, X } from "lucide-react";
import { DashboardCard } from "./dasboard-card";
import { useModal } from "@/hooks/use-modal-store";
import { ProjectStage } from "@prisma/client";
import { CalendarCard } from "../../ui/calendar-card";
import { TimeDisplay } from "../../ui/time-display";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ProjectStagesCardProps {
  projectStages: ProjectStage[];
}

export const ProjectStagesCard = ({
  projectStages,
}: ProjectStagesCardProps) => {
  let activeStageStartDate = "";
  let activeStageDeadline = "";
  let activeStageOrder = null;

  const { onOpen } = useModal();
  const router = useRouter();

  const activeStage = projectStages.filter((p) => p.active)[0];
  if (activeStage) {
    activeStageOrder = activeStage?.order;
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
  }

  return (
    <DashboardCard icon={<Rocket strokeWidth={1} />} title="Project stages">
      <div className="space-x-[1px] flex h-60 items-center select-none">
        {projectStages.length === 0 && (
          <div className="bg-white dark:bg-neutral-950 text-center justify-center h-full w-full flex flex-col py-10 text-2xl font-light">
            <p>No project stages</p>
            <button
              onClick={() => {
                router.push("settings/stages");
              }}
              className="underline text-lg"
            >
              add here
            </button>
          </div>
        )}
        {projectStages.map(
          (stage) =>
            activeStageOrder != null && (
              <div
                className={cn(
                  "w-full flex transition-all duration-200 bg-slate-400 dark:bg-neutral-600",
                  stage.active &&
                    "h-40 bg-white dark:bg-black border dark:border-neutral-300 rounded-md hover:scale-[1.001] shadow-md",
                  stage.order > activeStageOrder &&
                    "h-10 items-center p-2 bg-stone-800/80 dark:bg-neutral-800 hover:scale-[1.001] hover:shadow-md hover:shadow-stone-500 text-stone-200",
                  stage.order < activeStageOrder &&
                    "h-10 items-center p-2 bg-green-800/50 dark:bg-green-900 text-green-50 hover:scale-[1.001] hover:shadow-md hover:shadow-stone-500"
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
                      <p className="font-light">
                        Deadline: {activeStageDeadline}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </DashboardCard>
  );
};
