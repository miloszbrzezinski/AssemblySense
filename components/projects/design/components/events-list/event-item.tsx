import { ComponentEventWithData } from "@/types";
import { EventType, ProjectComponent } from "@prisma/client";
import { ComponentEventName } from "./event-name";
import { ComponentEventDescription } from "./event-description";
import { ComponentEventSymbol } from "./event-symbol";
import { ComponentEventAddress } from "./event-address";

interface EventListItemProps {
  profileId: string;
  workspaceId: string;
  event: ComponentEventWithData;
  projectComponent: ProjectComponent;
}

export const EventListItem = ({
  profileId,
  workspaceId,
  event,
  projectComponent,
}: EventListItemProps) => {
  return (
    <div key={event.id} className="bg-stone-300 space-x-[1px] flex w-full h-10">
      <div className="bg-white h-10 w-full items-center justify-start flex">
        <ComponentEventName
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={event}
          projectComponent={projectComponent}
        />
      </div>
      <div className="bg-white h-10 min-w-24 items-center justify-start flex">
        <ComponentEventAddress
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={event}
          projectComponent={projectComponent}
        />
      </div>
      <div className="bg-white h-10 min-w-40 items-center justify-start flex">
        <ComponentEventSymbol
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={event}
          projectComponent={projectComponent}
        />
      </div>
      <div className="bg-white h-10 w-full items-center justify-start flex">
        <ComponentEventDescription
          profileId={profileId}
          workspaceId={workspaceId}
          componentEvent={event}
          projectComponent={projectComponent}
        />
      </div>
    </div>
  );
};
