import { FilePlus, FolderPlus, ListCollapse, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { Catalog } from "../ui/catalog";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { ComponentCategory } from "@prisma/client";

interface LibrarySidebarProps {
  componentCategories: ComponentCategory[];
}

export const LibrarySidebar = async ({
  componentCategories,
}: LibrarySidebarProps) => {
  return (
    <div className="relative w-full h-full border-r border-stone-300 shadow-md">
      <div className="absolute z-10 flex p-1 space-x-1 w-full justify-end border-b shadow-sm bg-stone-300/10 backdrop-blur-sm">
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
      {componentCategories.length === 0 && (
        <p className="pt-10 pl-2 text-stone-500">Library empty</p>
      )}
      <div className="pb-44 pt-9 overflow-y-scroll h-full">
        {componentCategories.map((category) => (
          <Catalog key={category.id} />
        ))}
      </div>
    </div>
  );
};
