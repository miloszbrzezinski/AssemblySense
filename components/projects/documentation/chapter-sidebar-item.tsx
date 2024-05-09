"use client";
import {
  Bookmark,
  Edit,
  FilePlus,
  Flag,
  Folder,
  FolderPlus,
  Plus,
  Trash,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/catalog-accordion";
import { AssemblyGroupWithProcesses } from "@/types";
import { useModal } from "@/hooks/use-modal-store";
import { startTransition, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { setAssemblyGroupName } from "@/actions/assembly-group";
import { toast } from "sonner";

interface ChapterSidebarItemProps {
  chapterName: string;
}

export const ChapterSidebarItem = ({
  chapterName,
}: ChapterSidebarItemProps) => {
  const [nameEdit, setNameEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [newAssemblyGroupName, setNewAssemblyGroupName] = useState(chapterName);
  const router = useRouter();
  const { onOpen } = useModal();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // if (event.key === "Enter") {
    //   startTransition(() => {
    //     setAssemblyGroupName(
    //       profileId,
    //       workspaceId,
    //       assemblyGroup.projectId,
    //       assemblyGroup.id,
    //       newAssemblyGroupName
    //     ).then((data) => {
    //       // setError(data.error);
    //       if (data) {
    //         toast(data.success, {
    //           action: {
    //             label: "Undo",
    //             onClick: () => console.log("Undo"),
    //           },
    //         });
    //         router.refresh();
    //         setNameEdit(false);
    //       }
    //     });
    //   });
    // }
    // if (event.key === "Escape") {
    //   setNameEdit(false);
    // }
  };

  return (
    <Accordion type="multiple" className="group">
      <AccordionItem value="group">
        <div className="flex w-full justify-between items-center pr-2">
          <AccordionTrigger className="justify-start items-center space-x-1">
            <Bookmark strokeWidth={1} className="min-w-6 h-6" />{" "}
            {!nameEdit && <p>{chapterName}</p>}
          </AccordionTrigger>
          {nameEdit && (
            <input
              ref={inputRef}
              type="text"
              value={newAssemblyGroupName}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setNewAssemblyGroupName(e.target.value);
              }}
              className="h-min w-full text-md px-2"
              onBlur={() => {
                newAssemblyGroupName.length === 0 && setNameEdit(false);
              }}
            />
          )}
        </div>

        <AccordionContent className="w-full"></AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
