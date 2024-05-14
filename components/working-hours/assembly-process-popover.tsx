"use client";
import {
  setComponentsAssemblyGroup,
  setComponentsAssemblyProcess,
} from "@/actions/project-components";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import {
  AssemblyGroupWithProcesses,
  ProjectComponentWithData,
  WorkingHoursWithProjectMember,
} from "@/types";
import { AssemblyGroup, AssemblyProcess } from "@prisma/client";
import { ComponentIcon, Folder, Goal, Search, X } from "lucide-react";
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

interface AssemblyProcessPopoverProps {
  profileId: string;
  workspaceId: string;
  assemblyGroups: AssemblyGroupWithProcesses[];
  workingHours: WorkingHoursWithProjectMember;
}

export const AssemblyProcessPopover = ({
  profileId,
  workspaceId,
  assemblyGroups,
  workingHours,
}: AssemblyProcessPopoverProps) => {
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
  const filteredGroups = assemblyGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchInput) &&
      group.id === workingHours.assemblyGroupId
  );

  useEffect(() => {
    if (workingHours.process) {
      setSelectedValue(
        `${workingHours.process.processId} ${workingHours.process.name}`
      );
    }
  }, [workingHours.assemblyGroup]);

  // const onClick = (process: AssemblyProcess) => {
  //   startTransition(() => {
  //     setComponentsAssemblyProcess(
  //       profileId,
  //       workspaceId,
  //       projectComponent,
  //       process,
  //       projectComponent.projectId,
  //     ).then((data) => {
  //       // setError(data.error);
  //       if (data.success) {
  //         setSelectedValue(`${process.processId} ${process.name}`);
  //         toast(data.success, {
  //           description: `New process: ${process.processId} ${process.name}`,
  //           action: {
  //             label: "Undo",
  //             onClick: () => console.log("Undo"),
  //           },
  //         });
  //         closeRef.current?.click();
  //         router.refresh();
  //       }
  //     });
  //   });
  // };

  // const removeGroup = () => {
  //   startTransition(() => {
  //     setComponentsAssemblyProcess(
  //       profileId,
  //       workspaceId,
  //       projectComponent,
  //       null,
  //       projectComponent.projectId,
  //     ).then((data) => {
  //       // setError(data.error);
  //       if (data.success) {
  //         setSelectedValue("General");
  //         closeRef.current?.click();
  //         toast(data.success, {
  //           description: `New group: ${"General"}`,
  //           action: {
  //             label: "Undo",
  //             onClick: () => console.log("Undo"),
  //           },
  //         });
  //         router.refresh();
  //       }
  //     });
  //   });
  // };

  return (
    <Popover>
      <PopoverTrigger className="text-base h-10 w-full flex items-center justify-start hover:bg-slate-200">
        <h3 className="text-sm font-light px-2 whitespace-nowrap">
          {selectedValue}
        </h3>
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
          <div className="w-full flex items-center space-x-2 p-2 bg-white hover:bg-stone-50 font-light select-none">
            <ComponentIcon strokeWidth={1} />
            <h3>General</h3>
          </div>
          {filteredGroups.map((group) =>
            group.assemblyProcesses.map((process) => (
              <div
                key={process.id}
                className="w-full flex items-center space-x-2 p-2 bg-white hover:bg-stone-50 font-light select-none"
              >
                <ComponentIcon strokeWidth={1} />
                <div className="space-x-2">
                  <span className="font-light">{process.processId}</span>
                  <span className="font-extralight">{process.name}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
