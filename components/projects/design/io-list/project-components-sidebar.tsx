"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";
import { ProjectComponentWithData } from "@/types";
import { Button } from "@/components/ui/button";
import { TitleBar } from "../titlebar";

interface ProjectComponentSidebarProps {
  profileId: string;
  projectId: string;
  projectComponents: ProjectComponentWithData[];
}

export const ProjectComponentSidebar = ({
  profileId,
  projectId,
  projectComponents,
}: ProjectComponentSidebarProps) => {
  return (
    <div className="w-full h-full border-r pb-20 border-stone-300 shadow-md overflow-scroll ">
      <TitleBar title="Project components" />
      <div className="flex flex-col space-y-[1px] bg-stone-300">
        {projectComponents.map((component) => (
          <div
            key={component.id}
            className="flex bg-stone-200 space-x-[1px] h-10 rounded-none justify-start"
          >
            <div className="w-full bg-stone-50 items-center justify-start h-full flex pl-2">
              <p className="font-light">{component.name}</p>
            </div>
            <Button
              key={component.id}
              variant="ghost"
              className="flex font-light min-w-10 bg-stone-50 p-2 rounded-none justify-start"
            >
              1.0
            </Button>
            <Button
              key={component.id}
              variant="ghost"
              className="flex font-light min-w-10 bg-stone-50 p-2 rounded-none justify-start"
            >
              0.1
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
