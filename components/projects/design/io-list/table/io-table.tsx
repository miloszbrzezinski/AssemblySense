import { Binary } from "lucide-react";

import { ComponentsEventsTableData } from "@/types";
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
    <div className="flex-grow overflow-auto">
      <table className="border-collapse shadow-md relative w-full bg-white">
        <thead className="h-14">
          <tr>
            <th className="sticky top-0 border bg-neutral-100/90 border-l-0 border-t-0 border-stone-300 w-10 min-w-10">
              <div className="flex items-center justify-center">
                <Binary strokeWidth={1} />
              </div>
            </th>
            <th className="sticky top-0 border bg-neutral-100/95 border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Process
            </th>
            <th className="sticky top-0 border bg-neutral-100/95 border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Component
            </th>
            <th className="sticky top-0 border bg-neutral-100/95 border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Event
            </th>
            <th className="sticky top-0 border bg-neutral-100/95 border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Adress
            </th>
            <th className="sticky top-0 border bg-neutral-100/95 border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Symbol
            </th>
            <th className="sticky top-0 border bg-neutral-100/95 border-r-0 border-t-0 border-stone-300 min-w-36 text-base font-light whitespace-nowrap px-6">
              Comment
            </th>
          </tr>
        </thead>
        <tbody className="pb-20">
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
        </tbody>
      </table>
    </div>
  );
};
