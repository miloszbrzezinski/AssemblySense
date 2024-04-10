"use client";
import { setComponentEventEnableComment } from "@/actions/component-event";
import {
  setProjectComponentDescription,
  setProjectComponentsName,
} from "@/actions/project-components";
import { ComponentEventWithData, ProjectComponentWithData } from "@/types";
import { ComponentEvent } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface ComponentEnableDescriptionProps {
  profileId: string;
  workspaceId: string;
  componentEvent: ComponentEventWithData;
  componentStatuses: ComponentEvent[];
}

export const ComponentEnableDescription = ({
  profileId,
  workspaceId,
  componentEvent,
  componentStatuses,
}: ComponentEnableDescriptionProps) => {
  const [componentDescription, setComponentDescription] = useState("");
  const router = useRouter();

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setComponentDescription(event.currentTarget.value);
    // setSearchInput(nameInput);
  };

  useEffect(() => {
    if (componentEvent.eventEnableComment) {
      setComponentDescription(componentEvent.eventEnableComment);
    }
  }, [componentEvent]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startTransition(() => {
        setComponentEventEnableComment(
          profileId,
          workspaceId,
          componentEvent.projectComponent.id,
          componentEvent.id,
          componentDescription,
          componentEvent.projectComponent.projectId,
        ).then((data) => {
          // setError(data.error);
          if (data.success) {
            toast(data.success, {
              description: `New comment: ${componentDescription}`,
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
            router.refresh();
          }
        });
      });
    }
    if (event.key === "Escape") {
      if (componentEvent.eventEnableComment) {
        setComponentDescription(componentEvent.eventEnableComment);
      }
    }
  };

  return (
    <input
      onChange={handleInput}
      value={componentDescription}
      onKeyDown={handleKeyDown}
      className="group-hover:bg-slate-100 w-full h-10 text-sm font-light focus:outline-none focus:bg-slate-200 focus:rounded-none pl-2"
    />
  );
};
