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
    <div className="flex-grow overflow-auto">
      <table className="border-collapse shadow-md relative w-full bg-white">
        <thead className="h-14">
          <tr>
            <th className="sticky top-0 border bg-neutral-100/90 border-l-0 border-t-0 border-stone-300 w-10 min-w-10">
              <div className="flex items-center justify-center">
                <Shield strokeWidth={1} />
              </div>
            </th>
            <th className="sticky top-0 border bg-neutral-100/95 border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Process
            </th>
            <th className="sticky top-0 border bg-neutral-100/95 border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Action
            </th>
            <th className="sticky top-0 border bg-neutral-100/95 border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Enable
            </th>
            <th className="sticky top-0 border bg-neutral-100/95 border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Comment
            </th>
          </tr>
        </thead>
        <tbody className="pb-20">
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
        </tbody>
      </table>
    </div>
  );
};
