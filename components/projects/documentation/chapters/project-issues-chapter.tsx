import { SubChapterItem } from "../docs-sections/sub-chapter-item";
import { db } from "@/lib/db";
import { SectionItem } from "../docs-sections/section-item";
import { ChapterItem } from "../docs-sections/chapter-item";

interface ProjectIssuesChapterProps {
  chapterNo: number;
  projectId: string;
}

export const ProjectIssuesChapter = async ({
  chapterNo,
  projectId,
}: ProjectIssuesChapterProps) => {
  const issues = await db.projectIssue.findMany({
    where: {
      projectId,
    },
    include: {
      assemblyGroup: true,
      process: true,
      component: {
        include: {
          component: true,
        },
      },
      componentEvent: true,
      AddressIO: true,
      network: true,
      connection: true,
      sequence: true,
      sequenceStep: true,
      applicant: {
        include: {
          workspaceMember: {
            include: {
              profile: true,
            },
          },
        },
      },
      solvedBy: {
        include: {
          workspaceMember: {
            include: {
              profile: true,
            },
          },
        },
      },
    },
  });

  return (
    <ChapterItem chapterNo={chapterNo} chapterName="Project issues">
      {issues.map((issue, i) => (
        <SubChapterItem
          key={issue.id}
          chapterNo={chapterNo}
          subChapterNo={i + 1}
          subChapterName={issue.name}
        >
          <>
            <SectionItem
              chapterNo={chapterNo}
              subCharterNo={i + 1}
              sectionNo={1}
              sectionName="Issue description"
            >
              <>
                <p>
                  <span className="font-medium">Issue source: </span>
                  <span>
                    {issue.component?.component.manufacturer}{" "}
                    {issue.component?.component.name} {issue.component?.name}
                  </span>
                  <span>{issue.componentEvent?.name}</span>
                  <span>{issue.AddressIO?.symbol}</span>
                  <span>{issue.sequence?.name}</span>
                  <span>{issue.sequenceStep?.name}</span>
                  <span>{issue.network?.name}</span>
                  <span>{issue.connection?.name}</span>
                </p>
                <p>
                  <span className="font-medium">Control group: </span>
                  {issue.assemblyGroup ? (
                    <span>
                      {issue.assemblyGroup?.name}
                      {": "}
                      {issue.process?.processId} {issue.process?.name}
                    </span>
                  ) : (
                    <span>General</span>
                  )}
                </p>
                <p>
                  <span className="font-medium">Date: </span>
                  {issue.createdAt.getDate()}/{issue.createdAt.getMonth() + 1}/
                  {issue.createdAt.getFullYear()}
                </p>
                <p>
                  <span className="font-medium">Applicant: </span>
                  {issue.applicant?.workspaceMember.profile.name}{" "}
                  {issue.applicant?.workspaceMember.profile.lastName}
                </p>
                <p>
                  <span className="font-medium">Description: </span>
                  {issue.description}
                </p>
              </>
            </SectionItem>
            {issue.solved && (
              <SectionItem
                chapterNo={chapterNo}
                subCharterNo={i + 1}
                sectionNo={1}
                sectionName="Issue solution"
              >
                {issue.solution}
                <p>
                  <span className="font-medium">Solved by: </span>
                  {issue.solvedBy?.workspaceMember.profile.name}{" "}
                  {issue.solvedBy?.workspaceMember.profile.lastName}
                </p>
              </SectionItem>
            )}
          </>
        </SubChapterItem>
      ))}
    </ChapterItem>
  );
};
