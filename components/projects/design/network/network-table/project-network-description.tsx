"use client";
import {
  setProjectComponentDescription,
  setProjectComponentsName,
} from "@/actions/project-components";
import { setProjectNetworkDescription } from "@/actions/project-network";
import { ProjectComponentWithData, ProjectNetworkWithData } from "@/types";
import { useRouter } from "next/navigation";
import { FormEvent, startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface ProjectNetworkDescriptionProps {
  profileId: string;
  workspaceId: string;
  projectNetwork: ProjectNetworkWithData;
}

export const ProjectNetworkDescription = ({
  profileId,
  workspaceId,
  projectNetwork,
}: ProjectNetworkDescriptionProps) => {
  const [componentDescription, setComponentDescription] = useState("");
  const router = useRouter();

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setComponentDescription(event.currentTarget.value);
    // setSearchInput(nameInput);
  };

  useEffect(() => {
    if (projectNetwork.description) {
      setComponentDescription(projectNetwork.description);
    }
  }, [projectNetwork]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startTransition(() => {
        setProjectNetworkDescription(
          profileId,
          workspaceId,
          projectNetwork,
          componentDescription,
          projectNetwork.projectId,
        ).then((data) => {
          // setError(data.error);
          if (data.success) {
            toast(data.success, {
              description: `New description: ${componentDescription}`,
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
      if (projectNetwork.description) {
        setComponentDescription(projectNetwork.description);
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
