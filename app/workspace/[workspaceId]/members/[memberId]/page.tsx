import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function WorkspaceMemberPage({
  params,
}: {
  params: { workspaceId: string; memberId: string };
}) {
  const profile = await currentProfile();

  if (!profile) return redirect("/");

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
      members: {
        where: {
          id: params.memberId,
        },
        include: {
          profile: true,
          department: true,
          projectMembers: {
            include: {
              project: true,
            },
          },
        },
      },
    },
  });

  if (!workspace) {
    return;
  }

  if (!workspace.members[0]) {
    return <p className="p-5">Member not found!</p>;
  }

  const member = workspace.members[0];

  return (
    <div className="h-full w-full flex flex-col p-4">
      <div className="pb-4">
        <div className="flex space-x-3">
          <p className="text-4xl font-extralight">{member.profile.name}</p>
          <p className="text-4xl font-light">{member.profile.lastName}</p>
        </div>
        <p className="text-xl font-extralight text-stone-600">
          {member.department ? member.department.name : "No department"}
        </p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="use_cases">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="overview"></TabsContent>
        <TabsContent value="use_cases"></TabsContent>
      </Tabs>
    </div>
  );
}
