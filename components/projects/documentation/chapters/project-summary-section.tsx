import { SubChapterItem } from "../docs-sections/sub-chapter-item";
import { db } from "@/lib/db";
import { ChapterItem } from "../docs-sections/chapter-item";
import { cn } from "@/lib/utils";
import { ProjectTargetsTableDocs } from "../project-targets-table-docs";

interface ProjectSummaryChapterProps {
  chapterNo: number;
  projectId: string;
}

export const ProjectSummaryChapter = async ({
  chapterNo,
  projectId,
}: ProjectSummaryChapterProps) => {
  const stages = await db.projectStage.findMany({
    where: {
      projectId,
    },
    orderBy: {
      order: "asc",
    },
  });

  const targets = await db.projectTarget.findMany({
    where: {
      projectId,
    },
  });

  return (
    <ChapterItem chapterNo={chapterNo} chapterName="Project summary">
      <SubChapterItem
        chapterNo={chapterNo}
        subChapterNo={1}
        subChapterName="Stages"
      >
        <div className="flex text-2xl font-light w-full">
          <p className="w-1/2">Plan</p>
          <p className="w-1/2 text-end">Realization</p>
        </div>
        {stages.map((stage, i) => (
          <div key={stage.id} className="w-full">
            <div className="flex w-full">
              <div className="w-full">
                <p className="space-x-2 text-xl font-extralight">
                  <span>Start day:</span>
                  {stage.startDate && (
                    <span>
                      {stage.startDate.getDate()}/{stage.startDate.getMonth()}/
                      {stage.startDate.getFullYear()}
                    </span>
                  )}
                </p>
                <p className="space-x-2 text-xl font-extralight">
                  <span>Deadline:</span>
                  {stage.deadline && (
                    <span>
                      {stage.deadline.getDate()}/{stage.deadline.getMonth()}/
                      {stage.deadline.getFullYear()}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex flex-col min-w-40 h-40 border rounded-full items-center justify-center whitespace-nowrap border-stone-800 bg-white shadow-md">
                <p className="text-3xl font-light">{stage.order}</p>
                <p className="text-lg">{stage.name}</p>
              </div>
              <div className="w-full"></div>
            </div>
            <div
              className={cn(
                "flex w-full h-20 items-center justify-center",
                i === stages.length - 1 && "hidden"
              )}
            >
              <div className="flex w-full" />
              <div className="flex w-40 h-20 items-center justify-center">
                <div className="flex w-[1px] h-full bg-stone-800" />
              </div>
              <div className="flex w-full" />
            </div>
          </div>
        ))}
      </SubChapterItem>
      <SubChapterItem
        chapterNo={chapterNo}
        subChapterNo={2}
        subChapterName="Targets"
      >
        <ProjectTargetsTableDocs projectTargets={targets} />
      </SubChapterItem>
    </ChapterItem>
  );
};
