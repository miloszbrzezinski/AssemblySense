"use client";
import { setComponentEventName } from "@/actions/component-event";
import { setProjectComponentsName } from "@/actions/project-components";
import { ComponentEventWithData, ProjectComponentWithData } from "@/types";
import { ProjectComponent } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface ComponentEventNameProps {
  profileId: string;
  workspaceId: string;
  projectComponent: ProjectComponent;
  componentEvent: ComponentEventWithData;
}

export const ComponentEventName = ({
  profileId,
  workspaceId,
  projectComponent,
  componentEvent,
}: ComponentEventNameProps) => {
  const [componentName, setComponentName] = useState("");
  const router = useRouter();

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setComponentName(event.currentTarget.value);
    // setSearchInput(nameInput);
  };

  useEffect(() => {
    setComponentName(componentEvent.name);
  }, [componentEvent]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startTransition(() => {
        setComponentEventName(
          profileId,
          workspaceId,
          projectComponent.id,
          componentEvent.id,
          componentName,
          projectComponent.projectId,
        ).then((data) => {
          // setError(data.error);
          if (data.success) {
            toast(data.success, {
              description: `New name: ${componentName}`,
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
      setComponentName(componentEvent.name);
    }
  };

  return (
    <input
      onChange={handleInput}
      value={componentName}
      onKeyDown={handleKeyDown}
      className="group-hover:bg-slate-100 w-full h-10 text-sm font-light focus:outline-none focus:bg-slate-200 focus:rounded-none pl-2"
    />
  );
};
