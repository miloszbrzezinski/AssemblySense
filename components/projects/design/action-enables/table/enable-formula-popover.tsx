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
          {componentEvent.eventEnableFormula.length > 2 ? (
            <EnableFormula formula={formula} />
          ) : (
            "Always enable"
          )}
        </h3>
      </PopoverTrigger>
      <PopoverContent className="rounded-none p-0 min-w-96 w-full bg-stone-200 space-y-[1px]">
        <div className="bg-white flex items-center pl-2">
          <Shield strokeWidth={1} />
          <EnableFormula formula={formula} />
          <Button
            onClick={remove}
            className="h-auto w-auto p-2 text-neutral-600 rounded-none"
            variant="ghost"
          >
            <Delete strokeWidth={1} />
          </Button>
          <PopoverClose ref={closeRef} asChild>
            <Button
              className="h-auto w-auto p-0 text-neutral-600 rounded-none"
              variant="ghost"
            >
              <X strokeWidth={1} className="hidden" />
            </Button>
          </PopoverClose>
        </div>

        <div className="bg-stone-200 space-y-[1px]">
          <div className="flex space-x-[1px] select-none">
            <button
              onClick={() => {
                onClick("AND");
              }}
              className="w-full p-2 bg-white hover:bg-stone-100"
            >
              AND
            </button>
            <button
              onClick={() => {
                onClick("OR");
              }}
              className="w-full p-2 bg-white hover:bg-stone-100"
            >
              OR
            </button>
            <button
              onClick={() => {
                onClick("NOT");
              }}
              className="w-full p-2 bg-white hover:bg-stone-100"
            >
              NOT
            </button>
            <button
              onClick={() => {
                onClick("(");
              }}
              className="w-full p-2  bg-white hover:bg-stone-100"
            >
              (
            </button>
            <button
              onClick={() => {
                onClick(")");
              }}
              className="w-full p-2 bg-white hover:bg-stone-100"
            >
              )
            </button>
          </div>
          {componentStatuses.map((status) => (
            <div
              key={status.id}
              onClick={() => {
                onClick(`$${status.name}`);
              }}
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
