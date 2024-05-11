import { db } from "@/lib/db";
import { ChapterSidebarItem } from "./chapter-sidebar-item";
import { SectionSidebarItem } from "./section-sidebar-item";
import { SubChapterSidebarItem } from "./sub-chapter-sidebar-item";
import { SubSectionSidebarItem } from "./sub-section-sidebar-item";

interface SidebarLayoutChapterProps {
  chapterNo: number;
  projectId: string;
}

export const SidebarLayoutChapter = async ({
  chapterNo,
  projectId,
}: SidebarLayoutChapterProps) => {
  const networks = await db.projectNetwork.findMany({
    where: {
      projectId,
    },
    include: {
      componentConnections: true,
    },
  });

  if (!networks) {
    return;
  }

  return (
    <ChapterSidebarItem chapterNo={chapterNo} chapterName={"Layout and Routes"}>
      <SubChapterSidebarItem
        chapterNo={chapterNo}
        subChapterNo={1}
        chapterName={"Layout and Routes"}
        subChapterName="Physical layout"
      />
      <SubChapterSidebarItem
        chapterNo={chapterNo}
        subChapterNo={2}
        chapterName={"Layout and Routes"}
        subChapterName="Routes"
      />
    </ChapterSidebarItem>
  );
};
