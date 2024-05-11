import { db } from "@/lib/db";
import { ChapterSidebarItem } from "./chapter-sidebar-item";
import { SectionSidebarItem } from "./section-sidebar-item";
import { SubChapterSidebarItem } from "./sub-chapter-sidebar-item";
import { SubSectionSidebarItem } from "./sub-section-sidebar-item";

interface SidebarNetworksChapterProps {
  chapterNo: number;
  projectId: string;
}

export const SidebarNetworksChapter = async ({
  chapterNo,
  projectId,
}: SidebarNetworksChapterProps) => {
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
    <ChapterSidebarItem chapterNo={chapterNo} chapterName={"Networks"}>
      {networks.map((network, i) => (
        <SubChapterSidebarItem
          chapterNo={chapterNo}
          subChapterNo={1 + i}
          chapterName={"Networks"}
          subChapterName={network.name}
        >
          <SectionSidebarItem
            chapterNo={chapterNo}
            subChapterNo={1 + i}
            sectionNo={1}
            chapterName={"Networks"}
            subChapterName={network.name}
            sectionName={"Overview"}
          />
          <SectionSidebarItem
            chapterNo={chapterNo}
            subChapterNo={1 + i}
            sectionNo={2}
            chapterName={"Networks"}
            subChapterName={network.name}
            sectionName={"Team members addresses"}
          />
          <SectionSidebarItem
            chapterNo={chapterNo}
            subChapterNo={1 + i}
            sectionNo={3}
            chapterName={"Networks"}
            subChapterName={network.name}
            sectionName={"Connections"}
          />
        </SubChapterSidebarItem>
      ))}
    </ChapterSidebarItem>
  );
};
