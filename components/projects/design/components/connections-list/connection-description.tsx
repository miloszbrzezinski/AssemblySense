"use client";
import { setProjectComponentConnectionDescription } from "@/actions/component-connection";
import {
  setComponentEventDescription,
  setComponentEventName,
} from "@/actions/component-event";
import { setProjectComponentsName } from "@/actions/project-components";
import { ComponentConnectionWithData, ComponentEventWithData, ProjectComponentWithData } from "@/types";
import { ProjectComponent } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface ConnectionDescriptionProps {
  profileId: string;
  workspaceId: string;
  projectComponent: ProjectComponent;
  connection: ComponentConnectionWithData;
}

export const ConnectionDescription = ({
  profileId,
  workspaceId,
  projectComponent,
  connection,
}: ConnectionDescriptionProps) => {
  const [connectionDescription, setConnectionDescription] = useState("");
  const router = useRouter();

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setConnectionDescription(event.currentTarget.value);
    // setSearchInput(nameInput);
  };

  useEffect(() => {
    if (connection.description) {
      setConnectionDescription(connection.description);
    }
  }, [connection]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startTransition(() => {
        setProjectComponentConnectionDescription(
          profileId,
          workspaceId,
          projectComponent,
          connection.id,
          connectionDescription,
        ).then((data) => {
          // setError(data.error);
          if (data.success) {
            toast(data.success, {
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
      setConnectionDescription(connection.name);
    }
  };

  return (
    <input
      onChange={handleInput}
      value={connectionDescription}
      onKeyDown={handleKeyDown}
      className="group-hover:bg-slate-100 w-full h-10 text-sm font-light focus:outline-none focus:bg-slate-200 focus:rounded-none pl-2"
    />
  );
};
