import { SubChapterItem } from "../docs-sections/sub-chapter-item";
import { db } from "@/lib/db";
import { ChapterItem } from "../docs-sections/chapter-item";
import { cn } from "@/lib/utils";

interface ProjectLayoutChapterProps {
  chapterNo: number;
  projectId: string;
}

export const ProjectLayoutChapter = async ({
  chapterNo,
  projectId,
}: ProjectLayoutChapterProps) => {
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
