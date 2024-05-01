"use client";
import { setComponentsAssemblyGroup } from "@/actions/project-components";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { ProjectComponentWithData } from "@/types";
import { AssemblyGroup, ProjectNetwork } from "@prisma/client";
import { Network, Plus, Search, X } from "lucide-react";
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

interface ProjectComponentConnectionPopoverProps {
  profileId: string;
  workspaceId: string;
  projectNetworks: ProjectNetwork[];
  projectComponent: ProjectComponentWithData;
}

export const ProjectComponentConnectionPopover = ({
  profileId,
  workspaceId,
  projectNetworks,
  projectComponent,
}: ProjectComponentConnectionPopoverProps) => {
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
  const filteredGroups = projectNetworks.filter((network) =>
    network.name.toLowerCase().includes(searchInput),
  );

  useEffect(() => {
    if (projectComponent.assemblyGroup) {
      setSelectedValue(projectComponent.assemblyGroup.name);
    }
  }, [projectComponent.assemblyGroup]);

  const onClick = (group: AssemblyGroup) => {
    startTransition(() => {
      setComponentsAssemblyGroup(
        profileId,
        workspaceId,
        projectComponent,
        group.id,
        projectComponent.projectId,
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
      setComponentsAssemblyGroup(
        profileId,
        workspaceId,
        projectComponent,
        null,
        projectComponent.projectId,
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
      <PopoverTrigger className="text-base h-10 pl-2 w-full flex items-center justify-start bg-white hover:bg-slate-200">
        <Plus strokeWidth={1}/>
        <h3 className="text-base font-light pl-2">Add connection</h3>
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
          {filteredGroups.map((group) => (
            <div
              onClick={() => {
                onClick(group);
              }}
              key={group.id}
              className="w-full flex items-center space-x-2 p-2 bg-white hover:bg-stone-50 font-light select-none"
            >
              <Network strokeWidth={1} />
              <h3>{group.name}</h3>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
