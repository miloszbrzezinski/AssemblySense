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
import { AssemblyGroup, AssemblyProcess, ComponentEvent } from "@prisma/client";
import {
  AlertTriangle,
  ComponentIcon,
  Delete,
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
import { EnableFormula } from "./enable-formula";
import { setComponentEventEnable } from "@/actions/component-event";

interface EnableFormulaPopoverProps {
  profileId: string;
  workspaceId: string;
  componentEvent: ComponentEventWithData;
  componentStatuses: ComponentEvent[];
}

export const EnableFormulaPopover = ({
  profileId,
  workspaceId,
  componentEvent,
  componentStatuses,
}: EnableFormulaPopoverProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [formula, setFormula] = useState("");
  const [formulaItems, setFormulaItems] = useState<String[]>([]);
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();

  // Handler for search input changes
  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setFormula(event.currentTarget.value);
  };

  useEffect(() => {
    if (componentEvent.eventEnableFormula) {
      setFormula(componentEvent.eventEnableFormula);
    }
  }, [componentEvent.eventEnableFormula]);

  const onClick = (item: string) => {
    setFormula(`${formula}+${item}`);
  };

  const onSave = () => {
    startTransition(() => {
      setComponentEventEnable(
        profileId,
        workspaceId,
        componentEvent.projectComponent.id,
        componentEvent.id,
        formula,
        componentEvent.projectComponent.projectId,
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

  const remove = () => {
    let tmpFormula = formula;
    let arrayFormula = tmpFormula.split("+");
    arrayFormula.pop();
    let stringFormula = arrayFormula.toString();
    tmpFormula = stringFormula.replaceAll(",", "+");

    setFormula(tmpFormula);
    startTransition(() => {
      setComponentEventEnable(
        profileId,
        workspaceId,
        componentEvent.projectComponent.id,
        componentEvent.id,
        formula,
        componentEvent.projectComponent.projectId,
      ).then((data) => {
        // setError(data.error);
        if (data.success) {
          router.refresh();
        }
      });
    });
  };

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "text-base h-10 w-full flex items-center justify-start hover:bg-slate-200 dark:hover:bg-slate-900",
          formula.length < 2 && "bg-amber-500/10 hover:bg-amber-200/50",
        )}
      >
        <AlertTriangle
          strokeWidth={1}
          className={cn("ml-4", formula.length > 1 && "hidden")}
        />
        <h3 className="text-sm font-light pl-2">
          {formula.length > 1 ? (
            <EnableFormula formula={formula} />
          ) : (
            "No condition"
          )}
        </h3>
      </PopoverTrigger>
      <PopoverContent className="rounded-none p-0 min-w-[50rem] max-w-[50rem] max-h-[50rem] w-full bg-stone-200 dark:bg-neutral-500 space-y-[1px]">
        <div className="bg-white dark:bg-neutral-950 flex items-center pl-0">
          <EnableFormula formula={formula} />
          <div className="flex h-full">
            <Button
              onClick={remove}
              className="h-auto w-auto p-2 text-neutral-600 dark:text-white dark:bg-neutral-950 rounded-none hover:bg-red-100 dark:hover:bg-neutral-900"
              variant="ghost"
            >
              <Delete strokeWidth={1} />
            </Button>
            <button
              onClick={onSave}
              className="h-full p-2 w-autorounded-none hover:bg-slate-500 bg-sky-900 text-white"
            >
              Save
            </button>
            <PopoverClose ref={closeRef} asChild>
              <button className="hidden">c</button>
            </PopoverClose>
          </div>
        </div>

        <div className="bg-stone-200 dark:bg-neutral-500 space-y-[1px]">
          <div className="flex space-x-[1px] select-none">
            <button
              onClick={() => {
                onClick("AND");
              }}
              className="w-full p-2 bg-white dark:bg-neutral-950 hover:bg-stone-100 dark:hover:bg-neutral-900"
            >
              AND
            </button>
            <button
              onClick={() => {
                onClick("OR");
              }}
              className="w-full p-2 bg-white dark:bg-neutral-950 hover:bg-stone-100 dark:hover:bg-neutral-900"
            >
              OR
            </button>
            <button
              onClick={() => {
                onClick("NOT");
              }}
              className="w-full p-2 bg-white dark:bg-neutral-950 hover:bg-stone-100 dark:hover:bg-neutral-900"
            >
              NOT
            </button>
            <button
              onClick={() => {
                onClick("(");
              }}
              className="w-full p-2  bg-white dark:bg-neutral-950 hover:bg-stone-100 dark:hover:bg-neutral-900"
            >
              (
            </button>
            <button
              onClick={() => {
                onClick(")");
              }}
              className="w-full p-2 bg-white dark:bg-neutral-950 hover:bg-stone-100 dark:hover:bg-neutral-900"
            >
              )
            </button>
          </div>
          {componentStatuses.length === 0 && (
            <h3 className="bg-white p-2 font-extralight text-2xl">
              No events available in this process
            </h3>
          )}
          {componentStatuses.map((status) => (
            <div
              key={status.id}
              onClick={() => {
                onClick(`$${status.name}`);
              }}
              className="w-full p-2 bg-white dark:bg-neutral-950 font-light hover:bg-stone-100 dark:hover:bg-neutral-900 select-none"
            >
              {status.name}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
