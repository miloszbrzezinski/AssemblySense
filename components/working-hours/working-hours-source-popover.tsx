"use client";
import {
  setComponentsAssemblyGroup,
  setComponentsAssemblyProcess,
} from "@/actions/project-components";
import { setWorkingHoursProjectAssemblyGroupProcess } from "@/actions/working-hours";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import {
  AssemblyGroupWithProcesses,
  ProjectComponentWithComponent,
  ProjectComponentWithData,
  WorkingHoursWithProjectMember,
} from "@/types";
import {
  AssemblyGroup,
  AssemblyProcess,
  ProjectNetwork,
  ProjectTarget,
  Sequence,
} from "@prisma/client";
import {
  ComponentIcon,
  Folder,
  Goal,
  Network,
  Puzzle,
  Search,
  Split,
  Target,
  Timer,
  X,
} from "lucide-react";
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

interface WorkingHoursSourcePopoverProps {
  profileId: string;
  workspaceId: string;
  projectComponents: ProjectComponentWithComponent[];
  projectNewtorks: ProjectNetwork[];
  sequences: Sequence[];
  targets: ProjectTarget[];
  workingHours: WorkingHoursWithProjectMember;
}

export const WorkingHoursSourcePopover = ({
  profileId,
  workspaceId,
  projectComponents,
  projectNewtorks,
  sequences,
  targets,
  workingHours,
}: WorkingHoursSourcePopoverProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedValue, setSelectedValue] = useState("General");
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();

  // Handler for search input changes
  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    const nameInput = event.currentTarget.value.toLowerCase();
    setSearchInput(nameInput);
  };

  // Filter the array based on the search term
  const filteredComponents = projectComponents.filter((component) =>
    component.name.toLowerCase().includes(searchInput)
  );

  // Filter the array based on the search term
  const filteredNewtorks = projectNewtorks.filter((network) =>
    network.name.toLowerCase().includes(searchInput)
  );

  // Filter the array based on the search term
  const filteredSequences = sequences.filter((sequence) =>
    sequence.name.toLowerCase().includes(searchInput)
  );

  // Filter the array based on the search term
  const filteredTargets = targets.filter((target) =>
    target.name.toLowerCase().includes(searchInput)
  );

  useEffect(() => {
    if (workingHours.process) {
      setSelectedValue(
        `${workingHours.process.processId} ${workingHours.process.name}`
      );
    }
  }, [workingHours.assemblyGroup]);

  const onClick = (process: AssemblyProcess) => {
    startTransition(() => {
      setWorkingHoursProjectAssemblyGroupProcess(
        profileId,
        workspaceId,
        workingHours.projectMember.projectId,
        workingHours,
        process.id
      ).then((data) => {
        // setError(data.error);
        if (data.success) {
          setSelectedValue(`${process.processId} ${process.name}`);
          toast(data.success, {
            description: `New process: ${process.processId} ${process.name}`,
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

  const removeGroup = () => {
    startTransition(() => {
      setWorkingHoursProjectAssemblyGroupProcess(
        profileId,
        workspaceId,
        workingHours.projectMember.projectId,
        workingHours,
        null
      ).then((data) => {
        // setError(data.error);
        if (data.success) {
          setSelectedValue("General");
          closeRef.current?.click();
          toast(data.success, {
            description: `New group: ${"General"}`,
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

  return (
    <Popover>
      <PopoverTrigger className="text-base h-10 w-full flex items-center justify-start hover:bg-slate-200">
        <h3 className="text-sm font-light px-2 whitespace-nowrap">
          {selectedValue}
        </h3>
      </PopoverTrigger>
      <PopoverContent className="rounded-none w-96 p-0 bg-stone-200 space-y-[1px]">
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
          <div
            onClick={removeGroup}
            className="w-full flex items-center space-x-2 p-2 bg-white hover:bg-stone-50 font-light select-none"
          >
            <Timer strokeWidth={1} />
            <h3>General</h3>
          </div>
          {filteredComponents.map((component) => (
            <div
              key={component.id}
              className="w-full flex items-center space-x-2 p-2 bg-white hover:bg-stone-50 font-light select-none"
            >
              <Puzzle strokeWidth={1} />
              <div className="space-x-2">
                <span className="font-light">{component.name}</span>
                <span className="font-extralight">
                  ({component.component.manufacturer} {component.component.name}
                  )
                </span>
              </div>
            </div>
          ))}
          {filteredNewtorks.map((network) => (
            <div
              key={network.id}
              className="w-full flex items-center space-x-2 p-2 bg-white hover:bg-stone-50 font-light select-none"
            >
              <Network strokeWidth={1} />
              <div className="space-x-2">
                <span className="font-light">{network.name}</span>
              </div>
            </div>
          ))}
          {filteredSequences.map((seq) => (
            <div
              key={seq.id}
              className="w-full flex items-center space-x-2 p-2 bg-white hover:bg-stone-50 font-light select-none"
            >
              <Split strokeWidth={1} />
              <div className="space-x-2">
                <span className="font-light">{seq.name}</span>
              </div>
            </div>
          ))}
          {filteredTargets.map((target) => (
            <div
              key={target.id}
              className="w-full flex items-center space-x-2 p-2 bg-white hover:bg-stone-50 font-light select-none"
            >
              <Target strokeWidth={1} />
              <div className="space-x-2">
                <span className="font-light">{target.name}</span>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
