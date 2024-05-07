import { AssemblyGroup, ProjectIssue } from "@prisma/client";
import { DonutGraph } from "../donut-graph";

interface StatusItemProps {
  group: AssemblyGroup | null;
  projectProblems: ProjectIssue[];
}

export const StatusItem = ({ group, projectProblems }: StatusItemProps) => {
  let problems = projectProblems.filter(
    (p) => p.assemblyGroupId === null && !p.solved
  );
  const groupName = group ? group.name : "General";
  if (group) {
    problems = projectProblems.filter(
      (p) => p.assemblyGroupId === group.id && !p.solved
    );
  }

  return (
    <div className="flex items-center justify-between w-full bg-white p-2 select-none hover:bg-slate-50">
      <div>
        <h2 className="text-xl">{groupName}</h2>
        <p className="text-stone-900">
          Tasks: <span className="text-lg font-medium">- / -</span>
        </p>
        <p className="text-red-900 text-lg">
          Problems: <span className="font-medium">{problems.length}</span>
        </p>
      </div>
      <DonutGraph tasksDone={20} problems={problems.length} total={30} />
    </div>
  );
};
