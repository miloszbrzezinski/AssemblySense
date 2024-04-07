import { Hash, Puzzle } from "lucide-react";
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
    <div className="flex flex-col w-full bg-stone-300 space-y-[1px] shadow-md">
      <div className="flex w-full h-14 bg-stone-300 space-x-[1px]">
        <div className="flex w-10 h-14 bg-white items-center p-2">
          <Puzzle strokeWidth={1} />
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-base font-light">Group</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-base font-light">Process</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-base font-light">Component symbol</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-base font-light">Component</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-base font-light">Status</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-base font-light">Comment</h3>
        </div>
      </div>
      {projectComponents.map((component) => (
        <ComponentTableItem
          key={component.id}
          profileId={profileId}
          workspaceId={workspaceId}
          projectComponent={component}
          assemblyGroups={assemblyGroups}
        />
      ))}
    </div>
  );
};

export default ComponentsTable;
