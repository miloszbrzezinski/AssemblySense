import { MemberItem } from "@/components/members/member-item";
import { NavbarButton } from "@/components/members/navbar-buttons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MembersTab } from "./_tabs/members";
import { DepartmentsTab } from "./_tabs/departments";

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
      departments: true,
    },
  });

  if (!workspace) {
    return;
  }
  return (
    <div className="h-full w-full flex flex-col">
      <SpaceNavbar spaceName="Members">
        <NavbarButton workspace={workspace} profileId={profile.id} />
      </SpaceNavbar>
      <div className="p-5">
        <Tabs defaultValue="members">
          <TabsList>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
          </TabsList>
          <div className="p-5">
            <TabsContent value="members">
              <MembersTab
                members={workspace.members}
                departments={workspace.departments}
              />
            </TabsContent>
            <TabsContent value="departments">
              <DepartmentsTab departmants={workspace.departments} />
            </TabsContent>
            <TabsContent value="organization"></TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
