import { Binary, Hash, Puzzle } from "lucide-react";

import {
  AssemblyGroupWithProcesses,
  ComponentEventWithData,
  ComponentsEventsTableData,
  ProjectComponentWithData,
} from "@/types";
import { IOTableItem } from "./io-table-item";

interface IOTableProps {
  profileId: string;
  workspaceId: string;
  projectComponents: ComponentsEventsTableData[];
}

export const IOTable = ({
  profileId,
  workspaceId,
  projectComponents,
}: IOTableProps) => {
  return (
    <div className="flex flex-col w-full bg-stone-300 space-y-[1px] shadow-md">
      <div className="flex w-full h-14 bg-stone-300 space-x-[1px]">
        <div className="flex w-10 h-14 bg-white items-center p-2">
          <Binary strokeWidth={1} />
        </div>
        <div className="flex min-w-28 h-14 bg-white items-center p-2">
          <h3 className="text-lg font-light">Process</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-lg font-light">Component</h3>
        </div>
        <div className="flex min-w-28 h-14 bg-white items-center p-2">
          <h3 className="text-lg font-light">Adress</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-lg font-light">Event</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-lg font-light">Comment</h3>
        </div>
      </div>
      {projectComponents.map((component) =>
        component.componentEvents.map((event) => (
          <IOTableItem
            key={event.id}
            profileId={profileId}
            workspaceId={workspaceId}
            componentEvent={event}
          />
        )),
      )}
    </div>
  );
};
