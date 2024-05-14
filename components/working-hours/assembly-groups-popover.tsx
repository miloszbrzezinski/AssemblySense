"use client";
import { setComponentsAssemblyGroup } from "@/actions/project-components";
import { setWorkingHoursProjectAssemblyGroup } from "@/actions/working-hours";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { WorkingHoursWithProjectMember } from "@/types";
import { AssemblyGroup, WorkingHours } from "@prisma/client";
import { Folder, Goal, Search, X } from "lucide-react";
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

interface AssemblyGroupPopoverProps {
  profileId: string;
  workspaceId: string;
  assemblyGroups: AssemblyGroup[];
  workingHours: WorkingHoursWithProjectMember;
}

const AssemblyGroupPopover = ({
  profileId,
  workspaceId,
  assemblyGroups,
  workingHours,
}: AssemblyGroupPopoverProps) => {
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
  const filteredGroups = assemblyGroups.filter((group) =>
    group.name.toLowerCase().includes(searchInput)
  );

  useEffect(() => {
    if (workingHours.assemblyGroup) {
      setSelectedValue(workingHours.assemblyGroup.name);
    }
  }, [workingHours.assemblyGroup]);

  const onClick = (group: AssemblyGroup) => {
    startTransition(() => {
      setWorkingHoursProjectAssemblyGroup(
        profileId,
        workspaceId,
        workingHours.projectMember.projectId,
        workingHours,
        group.id
      ).then((data) => {
        // setError(data.error);
        if (data.success) {
          setSelectedValue(group.name);
          toast(data.success, {
            description: `New group: ${group.name}`,
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
      setWorkingHoursProjectAssemblyGroup(
        profileId,
        workspaceId,
        workingHours.projectMember.projectId,
        workingHours,
        null
      ).then((data) => {
        // setError(data.error);
        if (data.success) {
          if (data.success) {
            setSelectedValue("General");
            toast(data.success, {
              description: `New group: ${"General"}`,
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
            closeRef.current?.click();
            router.refresh();
          }
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
          <div
            onClick={removeGroup}
            className="w-full flex items-center space-x-2 p-2 bg-white hover:bg-stone-50 font-light select-none"
          >
            <Folder strokeWidth={1} />
            <h3>General</h3>
          </div>
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              onClick={() => {
                onClick(group);
              }}
              className="w-full flex items-center space-x-2 p-2 bg-white hover:bg-stone-50 font-light select-none"
            >
              <Folder strokeWidth={1} />
              <h3>{group.name}</h3>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AssemblyGroupPopover;
