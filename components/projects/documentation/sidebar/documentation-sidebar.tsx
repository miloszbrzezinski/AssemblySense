import { Separator } from "../../../ui/separator";
import { ChapterSidebarItem } from "./chapter-sidebar-item";
import { ChangeLogItem } from "../changelog-item";
import { db } from "@/lib/db";
import { SidebarAssemblyGroupsChapter } from "./sidebar-assembly-groups-chapter";
import { SidebarNetworksChapter } from "./sidebar-networks-chapter";
import { SidebarTeamsChapter } from "./sidebar-team-chapter";
import { SidebarSummaryChapter } from "./sidebar-summary-chapter";
import { SidebarLayoutChapter } from "./sidebar-layout-chapter";

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
      <SidebarSummaryChapter chapterNo={1} projectId={projectId} />
      <SidebarLayoutChapter chapterNo={2} projectId={projectId} />
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
