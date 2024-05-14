"use client";
import { setComponentsAssemblyGroup } from "@/actions/project-components";
import { setWorkingHoursProject } from "@/actions/working-hours";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import {
  ProjectComponentWithData,
  WorkingHoursWithProjectMember,
} from "@/types";
import { AssemblyGroup, Project, WorkingHours } from "@prisma/client";
import { Folder, Goal, PencilRuler, PenLine, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ElementRef,
  FormEvent,
  startTransition,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

interface ProjectsPopoverProps {
  profileId: string;
  workspaceId: string;
  projects: Project[];
  workingHours: WorkingHoursWithProjectMember;
}

export const ProjectsPopover = ({
  profileId,
  workspaceId,
  projects,
  workingHours,
}: ProjectsPopoverProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedValue, setSelectedValue] = useState("General");
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();

  // Handler for search input changes
  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    const nameInput = event.currentTarget.value.toLowerCase();
    setSearchInput(nameInput);
  };

  // Filter the team array based on the search term
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchInput)
  );

  useEffect(() => {
    if (workingHours) {
      setSelectedValue(workingHours.projectMember.project.name);
    }
  }, [workingHours.projectMember]);

  const onClick = (project: Project) => {
    startTransition(() => {
      setWorkingHoursProject(
        profileId,
        workspaceId,
        project.id,
        workingHours
      ).then((data) => {
        if (data.error) {
          toast(data.error, {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
        }
        if (data.success) {
          setSelectedValue(project.name);
          toast(data.success, {
            description: `New group: ${project.name}`,
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          closeRef.current?.click();
          router.refresh();
        }
      });
    });
  };

  return (
    <Popover>
      <PopoverTrigger className="text-base h-10 w-full flex items-center justify-start hover:bg-slate-200">
        <h3 className="text-sm font-light pl-2">{selectedValue}</h3>
      </PopoverTrigger>
      <PopoverContent className="rounded-none p-0 bg-stone-200 space-y-[1px]">
        <div className="bg-white flex items-center pl-2">
          <Search strokeWidth={1} />
          <input
            onChange={handleInput}
            className="w-full h-10 text-base font-light focus:outline-none focus:rounded-none pl-2"
          />
          <PopoverClose ref={closeRef} asChild>
            <Button
              className="h-auto w-auto p-2 text-neutral-600 rounded-none"
              variant="ghost"
            >
              <X strokeWidth={1} />
            </Button>
          </PopoverClose>
        </div>

        <div className="bg-stone-200 space-y-[1px]">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                onClick(project);
              }}
              className="w-full flex items-center space-x-2 p-2 bg-white hover:bg-stone-50 font-light select-none"
            >
              <PencilRuler strokeWidth={1} />
              <h3>{project.name}</h3>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
