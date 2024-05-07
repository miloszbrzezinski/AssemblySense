import ProjectItem from "@/components/projects/project-item";
import { Button } from "@/components/ui/button";
import HelloWidget from "@/components/workspace/hello-widget";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsPage({
  params,
}: {
  params: { workspaceId: string };
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
        include: {
          customer: true,
          projectStages: true,
        },
      },
    },
  });

  if (!workspace) {
    return;
  }

  return (
    <div className="h-full w-full flex flex-col">
      <SpaceNavbar spaceName="Projects">
        <Link href={`/workspace/${params.workspaceId}/projects/new`}>
          <Button className="space-x-2 px-3 bg-stone-500 text-stone-50">
            <Plus strokeWidth={1} />
            <p>Add project</p>
          </Button>
        </Link>
      </SpaceNavbar>
      <div className="p-5 overflow-y-scroll h-full">
        {workspace.projects.length === 0 && (
          <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="flex w-96 h-96">
              <Image src="/robot.svg" alt="Logo" width={1000} height={1000} />
            </div>
            <p className="text-6xl font-thin">No projects</p>
          </div>
        )}
        <div className="space-y-[1px] overflow-y-scroll shadow-lg bg-neutral-300">
          {workspace.projects.length > 0 &&
            workspace.projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
        </div>
      </div>
    </div>
  );
}
