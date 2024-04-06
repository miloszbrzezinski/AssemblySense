"use client";
import { FolderPlus } from "lucide-react";
import { Button } from "../ui/button";
import { ComponentCategoryComponent } from "./component-category";
import { useState } from "react";
import { NewCategory } from "./new-category";
import { ComponentCategoryWithComponents } from "@/types";

interface LibrarySidebarProps {
  profileId: string;
  workspaceId: string;
  componentCategories: ComponentCategoryWithComponents[];
}

export const LibrarySidebar = ({
  profileId,
  workspaceId,
  componentCategories,
}: LibrarySidebarProps) => {
  const [newCategory, setNewCategory] = useState(false);

  const hideNewCategory = () => {
    setNewCategory(false);
  };

  return (
    <div className="relative w-full h-full border-r border-stone-300 shadow-md">
      <div className="absolute z-10 flex p-1 space-x-1 w-full justify-end border-b shadow-sm bg-stone-300/10 backdrop-blur-sm">
        <Button
          onClick={() => {
            setNewCategory(true);
          }}
          variant="ghost"
          className="h-min p-0 hover:bg-white rounded-none"
        >
          <FolderPlus strokeWidth={0.8} className="w-6 h-6" />
        </Button>
      </div>
      {!newCategory && componentCategories.length === 0 && (
        <p className="pt-10 pl-2 text-stone-500">Library empty</p>
      )}
      <div className="pb-44 pt-9 overflow-y-scroll h-full">
        {newCategory && (
          <NewCategory
            hide={hideNewCategory}
            profileId={profileId}
            workspaceId={workspaceId}
          />
        )}
        {componentCategories.map((category) => (
          <ComponentCategoryComponent
            key={category.id}
            componentGroup={category}
            workspaceId={workspaceId}
            profileId={profileId}
          />
        ))}
      </div>
    </div>
  );
};
