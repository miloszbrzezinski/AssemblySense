"use client";
import { addSequenceStepAction } from "@/actions/process-sequence";
import { setComponentsAssemblyGroup } from "@/actions/project-components";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { ProjectComponentWithData, SequenceStepWithEvents } from "@/types";
import { AssemblyGroup, ComponentEvent } from "@prisma/client";
import { Folder, Goal, Plus, Search, X } from "lucide-react";
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

interface ActionsPopoverProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  groupId: string;
  processId: string;
  step: SequenceStepWithEvents;
  componentEvents: ComponentEvent[];
}

export const ActionsPopover = ({
  profileId,
  workspaceId,
  projectId,
  groupId,
  processId,
  step,
  componentEvents,
}: ActionsPopoverProps) => {
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
  const filteredActions = componentEvents.filter((event) =>
    event.name.toLowerCase().includes(searchInput),
  );

  const onClick = (eventId: string) => {
    startTransition(() => {
      addSequenceStepAction(
        profileId,
        workspaceId,
        projectId,
        groupId,
        processId,
        step.sequencepId,
        step.id,
        eventId,
      ).then((data) => {
        // setError(data.error);
        if (data.success) {
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

  return (
    <Popover>
      <PopoverTrigger className="text-base h-10 w-full flex items-center justify-start bg-stone-50 dark:bg-neutral-900 hover:bg-slate-200 mb-[1px]">
        <h3 className="text-sm font-light pl-2 flex items-center space-x-2">
          <Plus strokeWidth={1} /> <span>Add action</span>
        </h3>
      </PopoverTrigger>
      <PopoverContent className="rounded-none p-0 bg-stone-200 dark:bg-neutral-500 space-y-[1px]">
        <div className="bg-white dark:bg-neutral-950 flex items-center pl-2">
          <Search strokeWidth={1} />
          <input
            onChange={handleInput}
            className="w-full h-10 dark:bg-neutral-950 text-base font-light focus:outline-none focus:rounded-none pl-2"
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
          {filteredActions.map((event) => (
            <div
              onClick={() => {
                onClick(event.id);
              }}
              key={event.id}
              className="w-full flex items-center space-x-2 p-2 bg-white dark:bg-neutral-950 dark:hover:bg-neutral-900 hover:bg-stone-50 font-light select-none"
            >
              <h3>{event.name}</h3>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
