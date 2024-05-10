import { ChapterItem } from "@/components/projects/documentation/chapter-item";
import { ProcessSection } from "@/components/projects/documentation/process-sections";
import { ProjectTeamSection } from "@/components/projects/documentation/project-team-sections";
import { SubChapterItem } from "@/components/projects/documentation/sub-chapter-item";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

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
        <ChapterItem chapterNo={1} chapterName="Project summary">
          <SubChapterItem
            chapterNo={1}
            subChapterNo={1}
            subChapterName="Stages"
          >
            ...
          </SubChapterItem>
          <SubChapterItem
            chapterNo={1}
            subChapterNo={2}
            subChapterName="Targets"
          >
            ...
          </SubChapterItem>
        </ChapterItem>
        <ChapterItem chapterNo={2} chapterName="Layout">
          ...
        </ChapterItem>
        <ProjectTeamSection chapterNo={3} projectId={project.id} />
        {project.assemblyGroups.map((group, ig) => (
          <ChapterItem
            chapterNo={4 + ig}
            key={group.id}
            chapterName={group.name}
          >
            {group.assemblyProcesses.map((process, ip) => (
              <ProcessSection
                chapterNo={4 + ig}
                subCharterNo={ip + 1}
                key={process.id}
                processId={process.id}
              />
            ))}
          </ChapterItem>
        ))}
      </div>
    </div>
  );
}
