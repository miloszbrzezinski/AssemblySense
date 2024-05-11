import { ChapterSidebarItem } from "./chapter-sidebar-item";
import { SubChapterSidebarItem } from "./sub-chapter-sidebar-item";

interface SidebarTeamsChapterProps {
  chapterNo: number;
  projectId: string;
}

export const SidebarSummaryChapter = async ({
  chapterNo,
  projectId,
}: SidebarTeamsChapterProps) => {
  return (
    <ChapterSidebarItem chapterNo={chapterNo} chapterName={"Project"}>
      <SubChapterSidebarItem
        chapterNo={chapterNo}
        subChapterNo={1}
        chapterName={"Project"}
        subChapterName="Stages"
      />
      <SubChapterSidebarItem
        chapterNo={chapterNo}
        subChapterNo={2}
        chapterName={"Project"}
        subChapterName="Targets"
      />
    </ChapterSidebarItem>
  );
};
