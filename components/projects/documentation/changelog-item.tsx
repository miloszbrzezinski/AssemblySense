"use client";
import {
  Bookmark,
  Edit,
  FileClock,
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

export const ChangeLogItem = () => {
  return (
    <Accordion type="multiple" className="group">
      <AccordionItem value="group">
        <div className="flex w-full justify-between items-center pr-2">
          <AccordionTrigger className="justify-start items-center space-x-1">
            <FileClock strokeWidth={1} className="min-w-6 h-6" />{" "}
            <p>Changelog</p>
          </AccordionTrigger>
        </div>

        <AccordionContent className="w-full"></AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
