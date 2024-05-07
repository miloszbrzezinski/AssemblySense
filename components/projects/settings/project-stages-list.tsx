import { ProjectStage } from "@prisma/client";

interface ProjectStagesListProps {
  projectStages: ProjectStage[];
}

export const ProjectStagesList = ({
  projectStages,
}: ProjectStagesListProps) => {
  return (
    <div className="flex w-full h-full">
      <ol>
        {projectStages.map((stage) => (
          <li key={stage.id}>{stage.name}</li>
        ))}
      </ol>
    </div>
  );
};
