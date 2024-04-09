"use client";
import {
  setComponentEventAddress,
  setComponentEventDescription,
  setComponentEventName,
} from "@/actions/component-event";
import { setProjectComponentsName } from "@/actions/project-components";
import { ComponentEventWithData, ProjectComponentWithData } from "@/types";
import { EventType, ProjectComponent } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface ComponentEventAddressProps {
  profileId: string;
  workspaceId: string;
  projectComponent: ProjectComponent;
  componentEvent: ComponentEventWithData;
}

export const ComponentEventAddress = ({
  profileId,
  workspaceId,
  projectComponent,
  componentEvent,
}: ComponentEventAddressProps) => {
  const [componentName, setComponentName] = useState("");
  const router = useRouter();

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setComponentName(event.currentTarget.value);
    // setSearchInput(nameInput);
  };

  useEffect(() => {
    if (componentEvent.addressIO) {
      const eventTypeSymbol =
        componentEvent.eventType === EventType.STATUS ? "I" : "O";
      setComponentName(
        `${eventTypeSymbol}${componentEvent.addressIO.byteAdress}.${componentEvent.addressIO.bitAdress}`,
      );
    }
  }, [componentEvent]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startTransition(() => {
        setComponentEventAddress(
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
              description: `New address: ${componentName}`,
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
      if (componentEvent.addressIO) {
        const eventTypeSymbol =
          componentEvent.eventType === EventType.STATUS ? "I" : "O";
        setComponentName(
          `${eventTypeSymbol} ${componentEvent.addressIO.byteAdress}.${componentEvent.addressIO.bitAdress}`,
        );
      }
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
