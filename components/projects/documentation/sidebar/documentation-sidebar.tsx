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
    <div className="w-full h-full border-r pt-3 pb-20 border-stone-300 shadow-md overflow-scroll">
      <ChapterSidebarItem chapterNo={1} chapterName="Project">
        ..
      </ChapterSidebarItem>
      <ChapterSidebarItem chapterNo={2} chapterName="Layout and Routes">
        ..
      </ChapterSidebarItem>
      <ChapterSidebarItem chapterNo={3} chapterName="Team">
        ..
      </ChapterSidebarItem>
      <Separator />
      <ChapterSidebarItem chapterNo={4} chapterName="Networks">
        ..
      </ChapterSidebarItem>
      {assemblyGroups.map((group, i) => (
        <ChapterSidebarItem
          chapterNo={5 + i}
          key={group.id}
          chapterName={group.name}
        >
          {group.assemblyProcesses.map((process, j) => (
            <SubChapterSidebarItem
              chapterNo={5 + i}
              subChapterNo={j + 1}
              key={group.id}
              subChapterName={process.name}
            >
              <SectionSidebarItem
                chapterNo={5 + i}
                subChapterNo={j + 1}
                sectionNo={1}
                sectionName={"Description"}
              />
              <SectionSidebarItem
                chapterNo={5 + i}
                subChapterNo={j + 1}
                sectionNo={2}
                sectionName={"Components"}
              />
              <SectionSidebarItem
                chapterNo={5 + i}
                subChapterNo={j + 1}
                sectionNo={3}
                sectionName={"Connections"}
              />
              <SectionSidebarItem
                chapterNo={5 + i}
                subChapterNo={j + 1}
                sectionNo={4}
                sectionName={"I/O list"}
              />
              <SectionSidebarItem
                chapterNo={5 + i}
                subChapterNo={j + 1}
                sectionNo={5}
                sectionName={"Action enables"}
              />
              <SectionSidebarItem
                chapterNo={5 + i}
                subChapterNo={j + 1}
                sectionNo={6}
                sectionName={"Sequences"}
              >
                {process.sequences.map((sequence, si) => (
                  <SubSectionSidebarItem
                    key={sequence.id}
                    chapterNo={5 + i}
                    subChapterNo={j + 1}
                    sectionNo={j + 1}
                    subSectionNo={si + 1}
                    subSectionName={sequence.name}
                  >
                    ..
                  </SubSectionSidebarItem>
                ))}
              </SectionSidebarItem>
            </SubChapterSidebarItem>
          ))}
        </ChapterSidebarItem>
      ))}
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
