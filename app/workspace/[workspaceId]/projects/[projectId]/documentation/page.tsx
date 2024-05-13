import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { ProjectLayoutChapter } from "@/components/projects/documentation/chapters/project-layout-chapter";
import { ProjectTeamChapter } from "@/components/projects/documentation/chapters/project-team-sections";
import { ProjectSummaryChapter } from "@/components/projects/documentation/chapters/project-summary-chapter";
import { NetworkChapter } from "@/components/projects/documentation/chapters/network-chapter";
import { ProjectIssuesChapter } from "@/components/projects/documentation/chapters/project-issues-chapter";
import { AssemblyGroupChapter } from "@/components/projects/documentation/chapters/assembly-groups-chapter";

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
    return <h1>Loading PP</h1>;
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
          assemblyGroups: {
            include: {
              assemblyProcesses: true,
            },
          },
        },
      },
    },
  });

  if (!workspace) {
    return <h1>Loading PW</h1>;
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
          <AssemblyGroupChapter chapterNo={5} projectId={project.id} />
          <ProjectIssuesChapter
            chapterNo={project.assemblyGroups.length + 5}
            projectId={project.id}
          />
        </div>
      </div>
    </div>
  );
}
