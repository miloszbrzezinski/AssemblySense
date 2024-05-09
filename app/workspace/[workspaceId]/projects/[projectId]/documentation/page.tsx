import { ChapterItem } from "@/components/projects/documentation/chapter-item";
import { ProcessSection } from "@/components/projects/documentation/process-sections";
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
        <div className="pl-5">
          <h2 className="text-2xl">Project summary</h2>
          <div>
            <h3 className="text-xl">Stages</h3>
          </div>
          <div>
            <h3 className="text-xl">Targets</h3>
          </div>
        </div>
        <div className="pl-5">
          <h2 className="text-2xl">Layout</h2>
          <div className="pl-5">
            <h3 className="text-xl">Ref1...</h3>
          </div>
        </div>
        <div className="pl-5">
          <h2 className="text-2xl">Team</h2>
          <div className="pl-5">
            <h3 className="text-xl">Department..</h3>
          </div>
        </div>
        {project.assemblyGroups.map((group) => (
          <ChapterItem key={group.id} chapterName={group.name}>
            {group.assemblyProcesses.map((process) => (
              <ProcessSection key={process.id} processId={process.id} />
            ))}
          </ChapterItem>
        ))}
      </div>
    </div>
  );
}
