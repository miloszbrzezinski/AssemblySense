"use client";
import { ComponentCategoryWithComponents } from "@/types";
import { ComponentCategoryItem } from "./component-category";

interface DesignLibrarySidebarProps {
  profileId: string;
  workspaceId: string;
  componentCategories: ComponentCategoryWithComponents[];
  projectId: string;
}

export const DesignLibrarySidebar = ({
  profileId,
  workspaceId,
  componentCategories,
  projectId,
}: DesignLibrarySidebarProps) => {
  return (
    <div className="relative w-full h-full border-r border-stone-300 shadow-md">
      <div className="border-b text-xl font-light items-center p-2 bg-white shadow-md">
        <p>Workspace library</p>
      </div>
      {componentCategories.length === 0 && (
        <p className="pt-10 pl-2 text-stone-500">Library empty</p>
      )}
      <div className="pb-44 pt-2 overflow-y-scroll h-full">
        {componentCategories.map((category) => (
          <ComponentCategoryItem
            key={category.id}
            componentGroup={category}
            workspaceId={workspaceId}
            profileId={profileId}
            projectId={projectId}
          />
        ))}
      </div>
    </div>
  );
};
