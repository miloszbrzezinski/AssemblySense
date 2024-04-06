import { Hash } from "lucide-react";
import ComponentTableItem from "./component-table-item";
import { AssemblyGroup, ProjectComponent } from "@prisma/client";
import { ProjectComponentWithData } from "@/types";

interface ComponentsTableProps {
  profileId: string;
  workspaceId: string;
  projectComponents: ProjectComponentWithData[];
  assemblyGroups: AssemblyGroup[];
}

const ComponentsTable = ({
  profileId,
  workspaceId,
  assemblyGroups,
  projectComponents,
}: ComponentsTableProps) => {
  return (
    <div className="flex flex-col w-full bg-stone-500 space-y-[1px] shadow-md">
      <div className="flex w-full h-14 bg-stone-500 space-x-[1px]">
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-lg font-light">Group</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-lg font-light">Process</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-lg font-light">Component symbol</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-lg font-light">Component</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-lg font-light">Status</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-lg font-light">Comment</h3>
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
