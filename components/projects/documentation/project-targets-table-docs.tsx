"use client";
import { CalendarCard } from "@/components/ui/calendar-card";
import { TimeDisplay } from "@/components/ui/time-display";
import { useModal } from "@/hooks/use-modal-store";
import { ProjectTarget, ProjectTargetType } from "@prisma/client";

interface ProjectTargetsTableProps {
  projectTargets: ProjectTarget[];
}

export const ProjectTargetsTableDocs = ({
  projectTargets,
}: ProjectTargetsTableProps) => {
  return (
    <table>
      <tbody>
        {projectTargets.map((target) => (
          <tr key={target.id} className="group h-24 select-none">
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
                {/*is active here*/}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
