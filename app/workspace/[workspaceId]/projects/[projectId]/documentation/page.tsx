import { ChapterItem } from "@/components/projects/documentation/docs-sections/chapter-item";
import { ProcessSection } from "@/components/projects/documentation/chapters/process-sections";
import { ProjectLayoutChapter } from "@/components/projects/documentation/chapters/project-layout-chapter";
import { ProjectTeamChapter } from "@/components/projects/documentation/chapters/project-team-sections";
import { SubChapterItem } from "@/components/projects/documentation/docs-sections/sub-chapter-item";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ProjectSummaryChapter } from "@/components/projects/documentation/chapters/project-summary-chapter";
import { GeneralProcessSection } from "@/components/projects/documentation/chapters/gen-process-sections";
import { NetworkChapter } from "@/components/projects/documentation/chapters/network-chapter";
import { ProjectIssuesChapter } from "@/components/projects/documentation/chapters/project-issues-chapter";

export default async function ProjectDocumentationPage({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    workspaceId: string;
    projectId: string;
  };
}) {
  const profile = await currentProfile();

  if (!profile) {
    return;
  }
  const workspace = await db.workspace.findUnique({
    where: {
      id: params.workspaceId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      projects: {
        where: {
          id: params.projectId,
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
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  if (!workspace) {
    return;
  }

  const project = workspace.projects[0];

  if (!project) {
    return <p>No project</p>;
  }

  return (
    <div className="h-full w-full flex flex-col overflow-y-scroll">
      <div className="p-5">
        <h1 className="text-3xl">
          {project.projectNo} <span className="font-light">{project.name}</span>{" "}
          <span className="font-extralight"> - documentation</span>
        </h1>
        <div className="pl-5">
          <ProjectSummaryChapter chapterNo={1} projectId={project.id} />
          <ProjectLayoutChapter chapterNo={2} projectId={project.id} />
          <ProjectTeamChapter chapterNo={3} projectId={project.id} />
          <NetworkChapter chapterNo={4} projectId={project.id} />
          {project.assemblyGroups.map((group, ig) => (
            <ChapterItem
              chapterNo={5 + ig}
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
                  chapterNo={5 + ig}
                  subCharterNo={ip + 2}
                  key={process.id}
                  processId={process.id}
                />
              ))}
            </ChapterItem>
          ))}
          <ProjectIssuesChapter
            chapterNo={project.assemblyGroups.length + 5}
            projectId={project.id}
          />
        </div>
      </div>
    </div>
  );
}
