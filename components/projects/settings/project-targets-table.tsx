"use client";
import { Button } from "@/components/ui/button";
import { CalendarCard } from "@/components/ui/calendar-card";
import { TimeDisplay } from "@/components/ui/time-display";
import { useModal } from "@/hooks/use-modal-store";
import { ProjectTarget, ProjectTargetType } from "@prisma/client";
import {
  CalendarCheck,
  Edit,
  Hourglass,
  Target,
  Timer,
  Trash,
} from "lucide-react";

interface ProjectTargetsTableProps {
  profileId: string;
  workspaceId: string;
  projectTargets: ProjectTarget[];
}

export const ProjectTargetsTable = ({
  profileId,
  workspaceId,
  projectTargets,
}: ProjectTargetsTableProps) => {
  const { onOpen } = useModal();
  return (
    <table className="bg-white m-5 border border-collapse">
      <tbody>
        {projectTargets.map((target) => (
          <tr
            key={target.id}
            className="group h-24 hover:bg-slate-200 select-none"
          >
            <td className="w-32 max-w-32">
              <div className="flex w-32 items-center justify-center border-stone-400 px-5">
                {target.projectTargetType === ProjectTargetType.GENERAL && (
                  <p>{target.target}</p>
                )}
                {target.projectTargetType ===
                  ProjectTargetType.WORKING_TIME && (
                  <TimeDisplay time={target.target} />
                )}
                {target.projectTargetType === ProjectTargetType.TIME && (
                  <TimeDisplay time={target.target} />
                )}
                {target.projectTargetType === ProjectTargetType.DATE && (
                  <CalendarCard date={target.target} />
                )}
              </div>
            </td>
            <td className="w-min whitespace-nowrap">
              <div className="border-stone-400/70 border-l px-5">
                <h3 className="text-2xl font-light">{target.name}</h3>
                <p className="font-extralight">{target.description}</p>
              </div>
            </td>
            <td className="max-w-36 w-20 px-5">
              <div className="group-hover:flex hidden items-center justify-center space-x-1">
                <Button
                  onClick={() => {
                    onOpen("editProjectTarget", {
                      profileId,
                      workspaceId,
                      projectId: target.projectId,
                      projectTarget: target,
                    });
                  }}
                  variant="ghost"
                  className="w-min p-2 hover:bg-slate-300"
                >
                  <Edit strokeWidth={1} className="w-7 h-7" />
                </Button>
                <Button
                  onClick={() => {
                    onOpen("removeProjectTarget", {
                      profileId,
                      workspaceId,
                      projectId: target.projectId,
                      projectTargetId: target.id,
                    });
                  }}
                  variant="ghost"
                  className="w-min p-2 hover:bg-red-300/50"
                >
                  <Trash strokeWidth={1} className="w-7 h-7" />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
