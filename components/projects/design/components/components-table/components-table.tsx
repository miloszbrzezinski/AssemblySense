import { Hash, Puzzle, SquareArrowOutUpLeft } from "lucide-react";
import ComponentTableItem from "./component-table-item";
import {
  AssemblyGroup,
  AssemblyProcess,
  ProjectComponent,
} from "@prisma/client";
import { AssemblyGroupWithProcesses, ProjectComponentWithData } from "@/types";

interface ComponentsTableProps {
  profileId: string;
  workspaceId: string;
  projectComponents: ProjectComponentWithData[];
  assemblyGroups: AssemblyGroupWithProcesses[];
}

const ComponentsTable = ({
  profileId,
  workspaceId,
  assemblyGroups,
  projectComponents,
}: ComponentsTableProps) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="table-auto border-collapse shadow-md w-full bg-white overflow-x-scroll">
        <thead className="h-14">
          <tr>
            <th className="border border-l-0 border-t-0 border-stone-300 w-10 min-w-10">
              <div className="flex items-center justify-center">
                <Puzzle strokeWidth={1} />
              </div>
            </th>
            <th className="border border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Group
            </th>
            <th className="border border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Process
            </th>
            <th className="border border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Component symbol
            </th>
            <th className="border border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Component
            </th>
            <th className="border border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Status
            </th>
            <th className="border border-r-0 border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Comment
            </th>
          </tr>
        </thead>
        <tbody>
          {projectComponents.map((component) => (
            <ComponentTableItem
              key={component.id}
              profileId={profileId}
              workspaceId={workspaceId}
              projectComponent={component}
              assemblyGroups={assemblyGroups}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComponentsTable;
