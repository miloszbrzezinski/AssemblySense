import { db } from "@/lib/db";
import { ChapterItem } from "../docs-sections/chapter-item";
import { GeneralProcessSection } from "./gen-process-sections";
import { ProcessSection } from "./process-sections";

interface AssemblyGroupChapterProps {
  chapterNo: number;
  projectId: string;
}

export const AssemblyGroupChapter = async ({
  chapterNo,
  projectId,
}: AssemblyGroupChapterProps) => {
  const project = await db.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      projectComponents: true,
      projectMembers: true,
      projectNetworks: true,
      assemblyGroups: {
        include: {
          assemblyProcesses: true,
        },
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  if (!project) {
    return;
  }

  return (
    <>
      {project.assemblyGroups.map((group, ig) => (
        <ChapterItem
          chapterNo={chapterNo + ig}
          key={group.id}
          chapterName={group.name}
        >
          <GeneralProcessSection
            chapterNo={5 + ig}
            subCharterNo={1}
            groupId={group.id}
          />
          {group.assemblyProcesses.map((process, ip) => (
            <ProcessSection
              chapterNo={chapterNo + ig}
              subCharterNo={ip + 2}
              key={process.id}
              processId={process.id}
            />
          ))}
        </ChapterItem>
      ))}
    </>
  );
};
