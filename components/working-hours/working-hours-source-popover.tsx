"use client";
import {
  setComponentsAssemblyGroup,
  setComponentsAssemblyProcess,
} from "@/actions/project-components";
import {
  setWorkingHoursProjectAssemblyGroupProcess,
  setWorkingHoursSource,
} from "@/actions/working-hours";
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
  ProjectIssue,
  ProjectNetwork,
  ProjectTarget,
  Sequence,
} from "@prisma/client";
import {
  ComponentIcon,
  Flag,
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
  projectIssues: ProjectIssue[];
  sequences: Sequence[];
  targets: ProjectTarget[];
  workingHours: WorkingHoursWithProjectMember;
}

export const WorkingHoursSourcePopover = ({
  profileId,
  workspaceId,
  projectComponents,
  projectIssues,
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
  const filteredIsues = projectIssues.filter((issue) =>
    issue.name.toLowerCase().includes(searchInput)
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
    if (workingHours.component) {
      setSelectedValue(
        `${workingHours.component.name} (${workingHours.component.component.manufacturer} ${workingHours.component.component.name})`
      );
    }
    if (workingHours.target) {
      setSelectedValue(`${workingHours.target.name}`);
    }
    if (workingHours.sequence) {
      setSelectedValue(`${workingHours.sequence.name}`);
    }
  }, [workingHours.assemblyGroup]);

  const onClick = (
    component: ProjectComponentWithComponent | null,
    target: ProjectTarget | null,
    sequence: Sequence | null,
    issue: ProjectIssue | null
  ) => {
    const componentId = component ? component.id : null;
    const targetId = target ? target.id : null;
    const sequenceId = sequence ? sequence.id : null;
    const issueId = issue ? issue.id : null;
    startTransition(() => {
      setWorkingHoursSource(
        profileId,
        workspaceId,
        workingHours.projectMember.projectId,
        workingHours,
        componentId,
        targetId,
        sequenceId,
        issueId
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
          if (component) {
            setSelectedValue(
              `${component.name} (${component.component.manufacturer} ${component.component.name})`
            );
          }
          if (target) {
            setSelectedValue(`${target.name}`);
          }
          if (sequence) {
            setSelectedValue(`${sequence.name}`);
          }
          toast(data.success, {
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
      setWorkingHoursSource(
        profileId,
        workspaceId,
        workingHours.projectMember.projectId,
        workingHours,
        null,
        null,
        null,
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
              onClick={() => onClick(component, null, null, null)}
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
          {filteredSequences.map((seq) => (
            <div
              key={seq.id}
              onClick={() => onClick(null, null, seq, null)}
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
              onClick={() => onClick(null, target, null, null)}
              className="w-full flex items-center space-x-2 p-2 bg-white hover:bg-stone-50 font-light select-none"
            >
              <Target strokeWidth={1} />
              <div className="space-x-2">
                <span className="font-light">{target.name}</span>
              </div>
            </div>
          ))}
          {filteredIsues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => onClick(null, null, null, issue)}
              className="w-full flex items-center space-x-2 p-2 bg-white hover:bg-stone-50 font-light select-none"
            >
              <Flag strokeWidth={1} />
              <div className="space-x-2">
                <span className="font-light">{issue.name}</span>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
