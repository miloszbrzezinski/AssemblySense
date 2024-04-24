"use client";
import { setProjectComponentsName } from "@/actions/project-components";
import { useModal } from "@/hooks/use-modal-store";
import { ProjectComponentWithData } from "@/types";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ProjectComponentNavbarProps {
  profileId: string;
  workspaceId: string;
  projectComponent: ProjectComponentWithData;
}

export const ProjectComponentNavbar = ({
  profileId,
  workspaceId,
  projectComponent,
}: ProjectComponentNavbarProps) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const { onOpen } = useModal();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (projectComponent.name) {
      setName(projectComponent.name);
    }
  }, [projectComponent.name]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      saveName();
      inputRef.current?.blur();
    }
    if (event.key === "Escape") {
      if (projectComponent.name) {
        setName(projectComponent.name);
      }
      inputRef.current?.blur();
    }
  };

  const saveName = () => {
    startTransition(() => {
      setProjectComponentsName(
        profileId,
        workspaceId,
        projectComponent,
        name,
        projectComponent.projectId,
      ).then((data) => {
        // setError(data.error);
        if (data.success) {
          toast(data.success, {
            description: `New name: ${name}`,
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          router.refresh();
        }
      });
    });
  };
  projectComponent.projectId;
  const onDelete = () => {
    onOpen("removeProjectComponent", {
      profileId,
      workspaceId,
      projectId: projectComponent.projectId,
      projectComponentId: projectComponent.id,
    });
  };

  return (
    <div className="flex border-b text-xl font-light items-center p-2 py-0 pr-0 bg-white shadow-md justify-between">
      <div className="flex space-x-1 items-center whitespace-nowrap">
        <button
          onClick={() => {
            router.push(
              `/workspace/${workspaceId}/projects/${projectComponent.projectId}/design/components`,
            );
          }}
          className="hover:bg-stone-100 px-1 rounded-md"
        >
          Project components
        </button>
        <span>/</span>
        <h2 className="font-extralight select-none space-x-1">
          <span>{projectComponent.component.manufacturer}</span>
          <span className="font-light">{projectComponent.component.name}:</span>
        </h2>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onBlur={saveName}
          ref={inputRef}
          className="group-hover:bg-slate-100 dark:group-hover:bg-slate-900/50 dark:bg-neutral-900 w-full text-lg font-medium focus:outline-none dark:focus:bg-slate-800 focus:bg-slate-200 focus:rounded-none p-2"
        />
      </div>
      <button
        onClick={onDelete}
        className="flex hover:bg-red-500/30 dark:hover:bg-red-500/30 dark:text-red-100 text-red-900 h-10 px-4 items-center justify-center"
      >
        <Trash strokeWidth={1} />
      </button>
    </div>
  );
};
