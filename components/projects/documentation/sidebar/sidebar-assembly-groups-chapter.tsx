import { db } from "@/lib/db";
import { ChapterSidebarItem } from "./chapter-sidebar-item";
import { SectionSidebarItem } from "./section-sidebar-item";
import { SubChapterSidebarItem } from "./sub-chapter-sidebar-item";
import { SubSectionSidebarItem } from "./sub-section-sidebar-item";

interface SidebarAssemblyGroupsChapterProps {
  chapterNo: number;
  projectId: string;
}

export const SidebarAssemblyGroupsChapter = async ({
  chapterNo,
  projectId,
}: SidebarAssemblyGroupsChapterProps) => {
  const assemblyGroups = await db.assemblyGroup.findMany({
    where: {
      projectId,
    },
    include: {
      assemblyProcesses: {
        include: {
          sequences: true,
        },
      },
    },
  });

  if (!assemblyGroups) {
    return;
  }

  return (
    <>
      {assemblyGroups.map((group, i) => (
        <ChapterSidebarItem
          chapterNo={chapterNo + i}
          key={group.id}
          chapterName={group.name}
        >
          <SubChapterSidebarItem
            chapterNo={chapterNo + i}
            subChapterNo={1}
            chapterName={group.name}
            subChapterName="General"
          >
            <SectionSidebarItem
              chapterNo={chapterNo + i}
              subChapterNo={1}
              sectionNo={1}
              chapterName={group.name}
              subChapterName="General"
              sectionName={"Components"}
            />
            <SectionSidebarItem
              chapterNo={chapterNo + i}
              subChapterNo={1}
              sectionNo={2}
              chapterName={group.name}
              subChapterName="General"
              sectionName={"Connections"}
            />
            <SectionSidebarItem
              chapterNo={chapterNo + i}
              subChapterNo={1}
              sectionNo={3}
              chapterName={group.name}
              subChapterName="General"
              sectionName={"I/O list"}
            />
            <SectionSidebarItem
              chapterNo={chapterNo + i}
              subChapterNo={1}
              sectionNo={4}
              chapterName={group.name}
              subChapterName="General"
              sectionName={"Action enables"}
            />
          </SubChapterSidebarItem>
          {group.assemblyProcesses.map((process, j) => (
            <SubChapterSidebarItem
              chapterNo={chapterNo + i}
              subChapterNo={j + 2}
              key={group.id}
              chapterName={group.name}
              subChapterName={process.name}
            >
              <SectionSidebarItem
                chapterNo={chapterNo + i}
                subChapterNo={j + 2}
                sectionNo={1}
                chapterName={group.name}
                subChapterName={process.name}
                sectionName={"Description"}
              />
              <SectionSidebarItem
                chapterNo={chapterNo + i}
                subChapterNo={j + 2}
                sectionNo={2}
                chapterName={group.name}
                subChapterName={process.name}
                sectionName={"Components"}
              />
              <SectionSidebarItem
                chapterNo={chapterNo + i}
                subChapterNo={j + 2}
                sectionNo={3}
                chapterName={group.name}
                subChapterName={process.name}
                sectionName={"Connections"}
              />
              <SectionSidebarItem
                chapterNo={chapterNo + i}
                subChapterNo={j + 2}
                sectionNo={4}
                chapterName={group.name}
                subChapterName={process.name}
                sectionName={"I/O list"}
              />
              <SectionSidebarItem
                chapterNo={chapterNo + i}
                subChapterNo={j + 2}
                sectionNo={5}
                chapterName={group.name}
                subChapterName={process.name}
                sectionName={"Action enables"}
              />
              <SectionSidebarItem
                chapterNo={chapterNo + i}
                subChapterNo={j + 2}
                sectionNo={6}
                chapterName={group.name}
                subChapterName={process.name}
                sectionName={"Sequences"}
              >
                {process.sequences.map((sequence, si) => (
                  <SubSectionSidebarItem
                    key={sequence.id}
                    chapterNo={chapterNo + i}
                    subChapterNo={j + 1}
                    sectionNo={j + 1}
                    subSectionNo={si + 1}
                    chapterName={group.name}
                    subChapterName={process.name}
                    sectionName={"Sequences"}
                    subSectionName={sequence.name}
                  />
                ))}
              </SectionSidebarItem>
            </SubChapterSidebarItem>
          ))}
        </ChapterSidebarItem>
      ))}
    </>
  );
};
