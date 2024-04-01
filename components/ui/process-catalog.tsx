import {
  Copy,
  Edit,
  File,
  FilePlus,
  Folder,
  FolderPlus,
  Network,
  Puzzle,
  Scissors,
  Trash,
  Users,
  Waypoints,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./catalog-accordion";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./context-menu";
import { Button } from "./button";
import { Separator } from "./separator";

export const ProcessCatalog = () => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Accordion type="multiple">
          <AccordionItem value="group">
            <AccordionTrigger className="justify-start items-center space-x-1">
              <Folder strokeWidth={1} className="w-5 h-5" /> <p>ST100</p>
            </AccordionTrigger>
            <AccordionContent className="w-full">
              <Button
                variant="secondary"
                className="w-full h-min p-1 pl-5 justify-start space-x-2 hover:bg-stone-200/60 rounded-none"
              >
                <Users strokeWidth={1} className="w-5 h-5" />
                <p className="font-light">Members</p>
              </Button>
              <Button
                variant="secondary"
                className="w-full h-min p-1 pl-5 justify-start space-x-2 hover:bg-stone-200/60 rounded-none"
              >
                <Network strokeWidth={1} className="w-5 h-5" />
                <p className="font-light">Network</p>
              </Button>
              <Button
                variant="secondary"
                className="w-full h-min p-1 pl-5 justify-start space-x-2 hover:bg-stone-200/60 rounded-none"
              >
                <Puzzle strokeWidth={1} className="w-5 h-5" />
                <p className="font-light">Components</p>
              </Button>

              <Button
                variant="ghost"
                className="p-1 pl-5 h-min justify-start w-full rounded-none space-x-2 hover:bg-slate-200"
              >
                <File strokeWidth={1} className="w-5 h-5" />
                <div className="space-x-1 flex">
                  <p className="font-light">OP101</p>
                  <p className="font-extralight">Loading parts</p>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="p-1 pl-5 h-min justify-start w-full rounded-none space-x-2 hover:bg-slate-200"
              >
                <File strokeWidth={1} className="w-5 h-5" />
                <div className="space-x-1 flex">
                  <p className="font-light">OP102</p>
                  <p className="font-extralight">Processing part</p>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="p-1 pl-2 h-min justify-start w-full rounded-none space-x-1 hover:bg-slate-200"
              >
                <div className="w-2 h-full flex rounded-full bg-red-500" />
                <File strokeWidth={1} className="w-5 h-5" />
                <div className="space-x-1 flex">
                  <p className="font-light">OP103</p>
                  <p className="font-extralight">Packing parts</p>
                </div>
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="space-x-2">
          <p>Open</p>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="space-x-2">
          <FilePlus strokeWidth={1} className="w-5 h-5" />
          <p>New component</p>
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
