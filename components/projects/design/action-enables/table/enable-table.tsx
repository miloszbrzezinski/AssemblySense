import { Shield } from "lucide-react";

import {
  ActionEnableTableData,
  AssemblyGroupWithProcesses,
  ComponentEventWithData,
  ProjectComponentWithData,
} from "@/types";
import { EnableTableItem } from "./enable-table-item";
import { EventType, ComponentEvent, $Enums } from "@prisma/client";

interface EnableTableProps {
  profileId: string;
  workspaceId: string;
  projectComponents: ActionEnableTableData[];
}

export const EnableTable = ({
  profileId,
  workspaceId,
  projectComponents,
}: EnableTableProps) => {
  let events: ComponentEvent[] = [];

  projectComponents.forEach(
    (comp) => (events = [...events, ...comp.componentEvents]),
  );

  const statuses = events.filter(
    (event) => event.eventType === EventType.STATUS,
  );

  return (
    <div className="flex flex-col w-full bg-stone-300 space-y-[1px] shadow-md">
      <div className="flex w-full h-14 bg-stone-300 space-x-[1px]">
        <div className="flex w-10 h-14 bg-white items-center p-2">
          <Shield strokeWidth={1} />
        </div>
        <div className="flex min-w-28 h-14 bg-white items-center p-2">
          <h3 className="text-lg font-light">Process</h3>
        </div>
        <div className="flex min-w-48 h-14 bg-white items-center p-2">
          <h3 className="text-lg font-light">Action</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-lg font-light">Enable</h3>
        </div>
        <div className="flex w-full h-14 bg-white items-center p-2">
          <h3 className="text-lg font-light">Comment</h3>
        </div>
      </div>
      {projectComponents.map((component) =>
        component.componentEvents.map(
          (event) =>
            event.eventType === EventType.ACTION && (
              <EnableTableItem
                key={event.id}
                profileId={profileId}
                workspaceId={workspaceId}
                componentEvent={event}
                componentEvents={statuses}
              />
            ),
        ),
      )}
    </div>
  );
};
