"use client";
import { setProjectComponentsName } from "@/actions/project-components";
import { setProjectNetworkName } from "@/actions/project-network";
import { ProjectComponentWithData, ProjectNetworkWithData } from "@/types";
import { useRouter } from "next/navigation";
import { FormEvent, startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface ProjectNetworkNameProps {
  profileId: string;
  workspaceId: string;
  projectNetwork: ProjectNetworkWithData;
}

export const ProjectNetworkName = ({
  profileId,
  workspaceId,
  projectNetwork,
}: ProjectNetworkNameProps) => {
  const [componentName, setComponentName] = useState("");
  const router = useRouter();

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setComponentName(event.currentTarget.value);
    // setSearchInput(nameInput);
  };

  useEffect(() => {
    setComponentName(projectNetwork.name);
  }, [projectNetwork]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      startTransition(() => {
        setProjectNetworkName(
          profileId,
          workspaceId,
          projectNetwork,
          componentName,
          projectNetwork.projectId,
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
      setComponentName(projectNetwork.name);
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
