import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Project } from "@prisma/client";
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
              project: {
                include: {
                  projectStages: true,
                },
              },
              projectIssueSolved: true,
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

  const leaderCount = member.projectMembers.filter((m) => m.isLeader).length;
  let issueSolvedCount = 0;
  member.projectMembers.forEach(
    (m) => (issueSolvedCount += m.projectIssueSolved.length)
  );

  let projects: Project[] = [];
  member.projectMembers.forEach((m) => projects.push(m.project));

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
        <TabsContent value="overview">
          <div className="text-lg p-5 border">
            <a href={`mailto:${member.profile.email}`}>
              {member.profile.email}
            </a>
            <p>
              {member.projectMembers.length}{" "}
              <span className="font-light">
                project
                {member.projectMembers.length > 1 && "s"}
              </span>
            </p>
            <p>
              {leaderCount} <span className="font-light">project leader</span>
            </p>
            <p>
              {issueSolvedCount}{" "}
              <span className="font-light">
                project issue{issueSolvedCount > 1 && "s"} solved
              </span>
            </p>
          </div>
        </TabsContent>
        <TabsContent value="use_cases">
          {projects.map((project) => (
            <div className="bg-white p-5 text-xl">
              <p>
                {project.projectNo} {project.name}
              </p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
