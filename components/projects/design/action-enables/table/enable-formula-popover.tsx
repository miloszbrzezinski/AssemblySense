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
import { cn } from "@/lib/utils";
import {
  AssemblyGroupWithProcesses,
  ComponentEventWithData,
  ProjectComponentWithData,
} from "@/types";
import { AssemblyGroup, AssemblyProcess } from "@prisma/client";
import {
  AlertTriangle,
  ComponentIcon,
  Folder,
  Goal,
  LucideAlignHorizontalSpaceBetween,
  Search,
  Shield,
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

interface EnableFormulaPopoverProps {
  profileId: string;
  workspaceId: string;
  componentEvent: ComponentEventWithData;
  componentStatuses: ComponentEventWithData[];
}

export const EnableFormulaPopover = ({
  profileId,
  workspaceId,
  componentEvent,
  componentStatuses,
}: EnableFormulaPopoverProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedValue, setSelectedValue] = useState("General");
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();

  // Handler for search input changes
  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    const nameInput = event.currentTarget.value.toLowerCase();
    setSearchInput(nameInput);
  };

  useEffect(() => {
    if (componentEvent.eventEnableFormula) {
      setSelectedValue(`${componentEvent.eventEnableFormula}`);
    }
  }, [componentEvent.eventEnableFormula]);

  const onClick = (process: AssemblyProcess) => {
    startTransition(() => {
      setComponentsAssemblyProcess(
        profileId,
        workspaceId,
        projectComponent,
        process,
        projectComponent.projectId,
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
      setComponentsAssemblyProcess(
        profileId,
        workspaceId,
        projectComponent,
        null,
        projectComponent.projectId,
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
      <PopoverTrigger
        className={cn(
          "text-base h-10 w-full flex items-center justify-start hover:bg-slate-200",
          componentEvent.eventEnableFormula.length < 2 &&
            "bg-amber-500/10 hover:bg-amber-200/50",
        )}
      >
        <AlertTriangle
          strokeWidth={1}
          className={cn(
            "ml-4",
            componentEvent.eventEnableFormula.length > 2 && "hidden",
          )}
        />
        <h3 className="text-sm font-light pl-2">
          {componentEvent.eventEnableFormula.length > 2
            ? selectedValue
            : "Always enable"}
        </h3>
      </PopoverTrigger>
      <PopoverContent className="rounded-none p-0 w-96 bg-stone-200 space-y-[1px]">
        <div className="bg-white flex items-center pl-2">
          <Shield strokeWidth={1} />
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
          <div className="flex space-x-[1px] select-none">
            <button className="w-full p-2 bg-white hover:bg-stone-100">
              AND
            </button>
            <button className="w-full p-2 bg-white hover:bg-stone-100">
              OR
            </button>
            <button className="w-full p-2 bg-white hover:bg-stone-100">
              NOT
            </button>
            <button className="w-full p-2  bg-white hover:bg-stone-100">
              (
            </button>
            <button className="w-full p-2 bg-white hover:bg-stone-100">
              )
            </button>
          </div>
          {componentStatuses.map((status) => (
            <div
              key={status.id}
              className="w-full p-2 bg-white font-light hover:bg-stone-100 select-none"
            >
              {status.name}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
