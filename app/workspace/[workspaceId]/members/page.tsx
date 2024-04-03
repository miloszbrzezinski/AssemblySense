import { MemberItem } from "@/components/members/member-item";
import { NavbarButton } from "@/components/members/navbar-buttons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MembersTab } from "./_tabs/members";

export default async function WorkspaceMembersPage({
  params,
}: {
  params: {
    workspaceId: string;
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
      members: {
        include: {
          profile: true,
        },
      },
    },
  });

  if (!workspace) {
    return;
  }
  return (
    <div className="h-full w-full flex flex-col">
      <SpaceNavbar spaceName="Workspace members">
        <NavbarButton workspace={workspace} />
      </SpaceNavbar>
      <div className="p-5">
        <Tabs defaultValue="members">
          <TabsList>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
          </TabsList>
          <TabsContent
            value="members"
            className="h-full pt-2 overflow-y-scroll"
          >
            <MembersTab members={workspace.members} />
          </TabsContent>
          <TabsContent value="departments"></TabsContent>
          <TabsContent value="organization"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
