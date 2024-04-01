"use client";
import {
  FilePlus,
  FolderPlus,
  Network,
  Puzzle,
  Users,
  Waypoints,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ProcessCatalog } from "../ui/process-catalog";

export const DesignSidebar = () => {
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModal();
  return (
    <div className="w-full h-full border-r pb-20 border-stone-300 shadow-md overflow-scroll">
      <Accordion type="multiple">
        <AccordionItem value="project">
          <AccordionTrigger>
            <p className="text-lg pl-1 font-normal">Project</p>
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <Button
              onClick={() => {
                router.push(
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/network`,
                );
              }}
              variant="secondary"
              className="w-full justify-start space-x-2 hover:bg-stone-200/60 rounded-none"
            >
              <Users strokeWidth={1} />
              <p className="font-light">Members</p>
            </Button>
            <Button
              onClick={() => {
                router.push(
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/network`,
                );
              }}
              variant="secondary"
              className="w-full justify-start space-x-2 hover:bg-stone-200/60 rounded-none"
            >
              <Network strokeWidth={1} />
              <p className="font-light">Network</p>
            </Button>
            <Button
              onClick={() => {
                router.push(
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/components`,
                );
              }}
              variant="secondary"
              className="w-full justify-start space-x-2 hover:bg-stone-200/60 rounded-none"
            >
              <Puzzle strokeWidth={1} />
              <p className="font-light">Components</p>
            </Button>
            <Button
              onClick={() => {
                router.push(
                  `/workspace/${params.workspaceId}/projects/${params.projectId}/design/sequence`,
                );
              }}
              variant="secondary"
              className="w-full justify-start space-x-2 hover:bg-stone-200/60 rounded-none"
            >
              <Waypoints strokeWidth={1} />
              <p className="font-light">Sequence</p>
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="multiple">
        <AccordionItem value="project">
          <AccordionTrigger>
            <div className="flex justify-between w-full">
              <p className="text-lg pl-1 font-normal">Processes</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pl-4 pb-2">
            <ProcessCatalog />
            <ProcessCatalog />
            <ProcessCatalog />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
