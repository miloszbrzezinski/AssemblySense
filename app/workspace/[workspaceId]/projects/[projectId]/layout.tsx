import ProjectNavbar from "@/components/projects/project-navbar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function WorkspaceLayout({
  params,
  children,
}: {
  params: { workspaceId: string; projectId: string };
  children: React.ReactNode;
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
      },
    },
  });

  if (!workspace) {
    return;
  }

  if (!workspace.projects[0]) {
    return;
  }

  return (
    <div className="h-full bg-stone-100 dark:bg-zinc-800">
      <div className="absolute z-20 w-full left-0 md:pl-14 transition-all">
        <ProjectNavbar
          profileId={profile.id}
          project={workspace.projects[0]}
          isFavourite={false}
        />
      </div>
      <div className="h-full flex pt-24">
        <div className="w-full transition-all bg-stone-100 dark:bg-zinc-800">
          {children}
        </div>
      </div>
    </div>
  );
}
