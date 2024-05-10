import {
  AssemblyProcess,
  Department,
  EventType,
  ProjectNetwork,
} from "@prisma/client";
import { SubChapterItem } from "./sub-chapter-item";
import { db } from "@/lib/db";
import { EnableFormula } from "../design/action-enables/table/enable-formula";
import { ConnectionTableCell } from "./connection-table-cell";
import { ProcessSequenceDocs } from "./sequence/sequence";
import { SectionItem } from "./section-item";
import { SubSectionItem } from "./sub-section-item";
import { ChapterItem } from "./chapter-item";
import { DepartmentWithMembersWithProjects } from "@/types";
import { profile } from "console";
import { cn } from "@/lib/utils";

interface ProjectLayoutSectionProps {
  chapterNo: number;
  projectId: string;
}

export const ProjectLayoutSection = async ({
  chapterNo,
  projectId,
}: ProjectLayoutSectionProps) => {
  const processes = await db.assemblyProcess.findMany({
    where: {
      assemblyGroup: {
        projectId: projectId,
      },
    },
    include: {
      assemblyGroup: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <ChapterItem chapterNo={chapterNo} chapterName="Layout and Routes">
      <SubChapterItem
        chapterNo={chapterNo}
        subChapterNo={1}
        subChapterName="Physical layout"
      >
        {processes.map((process, i) => (
          <div key={process.id} className="w-1/4">
            <div className="flex w-full border p-2 whitespace-nowrap border-stone-800">
              {process.processId} {process.name}
            </div>
            <div
              className={cn(
                "flex w-full h-20 items-center justify-center",
                i === processes.length - 1 && "hidden"
              )}
            >
              <div className="flex w-[1px] h-full bg-stone-800" />
            </div>
          </div>
        ))}
      </SubChapterItem>
      <SubChapterItem
        chapterNo={chapterNo}
        subChapterNo={2}
        subChapterName="Routes"
      >
        ...
      </SubChapterItem>
    </ChapterItem>
  );
};
