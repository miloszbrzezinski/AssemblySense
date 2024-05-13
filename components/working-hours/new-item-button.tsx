"use client";
import { reportWorkingHours } from "@/actions/working-hours";
import { PencilRuler, Plus, Search, Timer, X } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "../ui/popover";
import { Button } from "../ui/button";
import { Project } from "@prisma/client";

interface NewItemButtonProps {
  profileId: string;
  workspaceId: string;
  projects: Project[];
}

export const NewItemButton = ({
  profileId,
  workspaceId,
  projects,
}: NewItemButtonProps) => {
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
  const filteredProjects = projects.filter((network) =>
    network.name.toLowerCase().includes(searchInput)
  );

  const onAdd = (project: Project) => {
    startTransition(() => {
      reportWorkingHours(profileId, workspaceId, project.id).then((data) => {
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
      <PopoverTrigger className="text-base h-10 pl-2 w-full flex items-center justify-start bg-white hover:bg-slate-200 border shadow-md">
        <Plus strokeWidth={1} />
        <h3 className="text-base font-light pl-2">Add</h3>
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
              onClick={() => {
                onAdd(project);
              }}
              key={project.id}
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
