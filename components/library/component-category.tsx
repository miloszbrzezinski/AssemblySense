"use client";
import {
  Copy,
  Edit,
  File,
  FilePlus,
  Folder,
  FolderPlus,
  Scissors,
  Trash,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/catalog-accordion";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { ComponentCategory } from "@prisma/client";
import { ComponentItem } from "./component-item";
import { ComponentCategoryWithComponents } from "@/types";
import { NewComponent } from "./new-component";
import { useModal } from "@/hooks/use-modal-store";

type NewFileForm = {
  fileName: string;
};

interface CatalogProps {
  componentGroup: ComponentCategoryWithComponents;
  profileId: string;
  workspaceId: string;
}

export const ComponentCategoryComponent = ({
  componentGroup,
  profileId,
  workspaceId,
}: CatalogProps) => {
  const [newComponent, setNewComponent] = useState(false);
  const { onOpen } = useModal();

  const hideNewCategory = () => {
    setNewComponent(false);
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Accordion type="multiple">
          <AccordionItem value="group">
            <AccordionTrigger className="justify-between items-center w-full pr-2">
              <div className="flex items-center space-x-1">
                <Folder strokeWidth={1} className="w-5 h-5" />
                <p>{componentGroup.name}</p>
              </div>
              <p className="text-sm font-extralight">
                {componentGroup.components.length}
              </p>
            </AccordionTrigger>
            <AccordionContent className="w-full">
              {newComponent && (
                <NewComponent
                  hide={hideNewCategory}
                  profileId={profileId}
                  workspaceId={workspaceId}
                />
              )}
              {componentGroup.components.map((component) => (
                <ComponentItem
                  key={component.id}
                  component={component}
                  workspaceId={componentGroup.workspaceId}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="space-x-2">
          <p>Open</p>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => {
            onOpen("addComponent", {
              componentCategory: componentGroup,
              profileId: profileId,
            });
          }}
          className="space-x-2"
        >
          <FilePlus strokeWidth={1} className="w-5 h-5" />
          <p>New component</p>s
        </ContextMenuItem>
        <ContextMenuItem className="space-x-2">
          <FolderPlus strokeWidth={1} className="w-5 h-5" />
          <p>New folder</p>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="space-x-2">
          <Scissors strokeWidth={1} className="w-5 h-5" />
          <p>Cut</p>
        </ContextMenuItem>
        <ContextMenuItem className="space-x-2">
          <Copy strokeWidth={1} className="w-5 h-5" />
          <p>Copy</p>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="space-x-2">
          <Edit strokeWidth={1} className="w-5 h-5" />
          <p>Rename</p>
        </ContextMenuItem>
        <ContextMenuItem className="space-x-2 text-red-800">
          <Trash strokeWidth={1} className="w-5 h-5" />
          <p>Delete</p>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
