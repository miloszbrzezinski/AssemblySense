import { CreateProjectForm } from "@/components/projects/create-project-form";
import { Button } from "@/components/ui/button";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function NewProjectPage({
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
      customers: true,
    },
  });

  if (!workspace) {
    return;
  }
  return (
    <div className="h-full w-full flex flex-col">
      <SpaceNavbar spaceName="Projects">
        <Link href={`/workspace/${params.workspaceId}/projects`}>
          <Button className="space-x-2 px-3 bg-rose-700 text-stone-50">
            <p>Cancel</p>
          </Button>
        </Link>
      </SpaceNavbar>
      <div className="p-5 overflow-y-scroll">
        <p className="text-4xl font-light text-stone-500 pb-5">New project</p>
        <CreateProjectForm
          userId={profile.id}
          workspaceId={params.workspaceId}
          customers={workspace.customers}
        />
      </div>
    </div>
  );
}
