import { Separator } from "../../../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { AssemblyGroupWithProcesses } from "@/types";
import { useState } from "react";
import {
  ProjectComponent,
  ProjectMember,
  ProjectNetwork,
} from "@prisma/client";
import { ChapterSidebarItem } from "./chapter-sidebar-item";
import { ChangeLogItem } from "../changelog-item";
import { SubChapterItem } from "../docs-sections/sub-chapter-item";
import { SubChapterSidebarItem } from "./sub-chapter-sidebar-item";
import { SectionSidebarItem } from "./section-sidebar-item";
import { db } from "@/lib/db";
import { SubSectionSidebarItem } from "./sub-section-sidebar-item";
import { SidebarAssemblyGroupsChapter } from "./sidebar-assembly-groups-chapter";
import { SidebarNetworksChapter } from "./sidebar-networks-chapter";
import { SidebarTeamsChapter } from "./sidebar-team-chapter";

interface DesignSidebarProps {
  projectId: string;
}

export const DocumentationSidebar = async ({
  projectId,
}: DesignSidebarProps) => {
  const assemblyGroups = await db.assemblyGroup.findMany({
    where: {
      projectId,
    },
  });

  if (!assemblyGroups) {
    return;
  }

  return (
    <div className="w-full h-full border-r pt-3 pb-20 border-stone-300 shadow-md overflow-scroll">
      <ChapterSidebarItem chapterNo={1} chapterName="Project">
        ..
      </ChapterSidebarItem>
      <ChapterSidebarItem chapterNo={2} chapterName="Layout and Routes">
        ..
      </ChapterSidebarItem>
      <SidebarTeamsChapter chapterNo={3} projectId={projectId} />
      <Separator />
      <SidebarNetworksChapter chapterNo={4} projectId={projectId} />
      <SidebarAssemblyGroupsChapter chapterNo={5} projectId={projectId} />
      <Separator />
      <ChapterSidebarItem
        chapterNo={assemblyGroups.length + 5}
        chapterName="Project issues"
      >
        ..
      </ChapterSidebarItem>
      <ChangeLogItem />
    </div>
  );
};
