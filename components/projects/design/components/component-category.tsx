"use client";
import { Folder } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/catalog-accordion";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ComponentItem } from "./component-item";
import { ComponentCategoryWithComponents } from "@/types";

interface ComponentCategoryItemProps {
  componentGroup: ComponentCategoryWithComponents;
  profileId: string;
  workspaceId: string;
  projectId: string;
}

export const ComponentCategoryItem = ({
  componentGroup,
  profileId,
  workspaceId,
  projectId,
}: ComponentCategoryItemProps) => {
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
              {componentGroup.components.map((component) => (
                <ComponentItem
                  key={component.id}
                  profileId={profileId}
                  component={component}
                  workspaceId={componentGroup.workspaceId}
                  projectId={projectId}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContextMenuTrigger>
    </ContextMenu>
  );
};
