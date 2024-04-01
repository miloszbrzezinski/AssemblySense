import {
  BookOpen,
  Copy,
  Edit,
  File,
  FilePlus,
  Folder,
  FolderPlus,
  ListCollapse,
  RefreshCw,
  Scissors,
  Trash,
} from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
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
import { Catalog } from "../ui/catalog";

export const LibrarySidebar = () => {
  return (
    <div className="relative w-full h-full border-r border-stone-300 shadow-md">
      <div className="absolute z-10 flex p-1 space-x-1 w-full justify-end border-b shadow-md bg-stone-200/80 backdrop-blur-sm">
        <Button
          variant="ghost"
          className="h-min p-0 hover:bg-white rounded-none"
        >
          <FilePlus strokeWidth={0.8} className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          className="h-min p-0 hover:bg-white rounded-none"
        >
          <FolderPlus strokeWidth={0.8} className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          className="h-min p-0 hover:bg-white rounded-none"
        >
          <RefreshCw strokeWidth={0.8} className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          className="h-min p-0 hover:bg-white rounded-none"
        >
          <ListCollapse strokeWidth={0.8} className="w-6 h-6" />
        </Button>
      </div>
      <div className="pb-44 pt-9 overflow-y-scroll h-full">
        <Catalog />
        <Catalog />
        <Catalog />
        <Catalog />
      </div>
    </div>
  );
};
