"use client";
import { File, Puzzle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Component } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { startTransition } from "react";
import { addProjectComponent } from "@/actions/project-components";
import { toast } from "sonner";

interface ComponentItemProps {
  profileId: string;
  component: Component;
  workspaceId: string;
  projectId: string;
}

export const ComponentItem = ({
  profileId,
  component,
  workspaceId,
  projectId,
}: ComponentItemProps) => {
  const router = useRouter();

  const onClick = () => {
    startTransition(() => {
      addProjectComponent(profileId, workspaceId, component, projectId).then(
        (data) => {
          // setError(data.error);
          if (data.success) {
            toast(data.success, {
              description: `${component.manufacturer} ${component.name} added to the project`,
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
            router.refresh();
          }
        },
      );
    });
  };

  return (
    <Button
      variant="ghost"
      className="p-1 pl-5 h-min justify-start w-full rounded-none space-x-2 hover:bg-slate-200"
      onClick={onClick}
    >
      <Puzzle strokeWidth={1} className="w-5 h-5" />
      <div className="space-x-1 flex">
        <p className="font-light">{component.manufacturer}</p>
        <p className="font-extralight">{component.name}</p>
      </div>
    </Button>
  );
};
