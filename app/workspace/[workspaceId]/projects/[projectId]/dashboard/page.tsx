import { DashboardCard } from "@/components/projects/dasboard-card";
import { ProjectMembersCard } from "@/components/projects/project-members-card";
import { ProjectProblemsCard } from "@/components/projects/project-problems-card";
import { ProjectTargetsCard } from "@/components/projects/project-targets-card";
import { Button } from "@/components/ui/button";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import {
  CalendarRange,
  Flag,
  Plus,
  SquareCheck,
  Target,
  Users,
} from "lucide-react";

export default async function ProjectDashboardPage({
  params,
}: {
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
          assemblyGroups: {
            include: {
              assemblyProcesses: true,
            },
          },
          projectIssues: true,
          projectTargets: true,
          projectMembers: {
            include: {
              workspaceMember: {
                include: {
                  profile: true,
                  department: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!workspace) {
    return;
  }

  const project = workspace.projects[0];

  if (!project) {
    return;
  }

  return (
    <div className="h-full w-full flex flex-col p-2 gap-2">
      <div className="flex h-2/3 w-full gap-2">
        <ProjectTargetsCard projectTarget={project.projectTargets} />
        <ProjectMembersCard projectMembers={project.projectMembers} />
        <DashboardCard
          icon={<SquareCheck strokeWidth={1} />}
          title="Project tasks"
        >
          Test
        </DashboardCard>
        <ProjectProblemsCard
          assemblyGroups={project.assemblyGroups}
          projectProblems={project.projectIssues}
        />
      </div>
      <div className="flex h-1/3 w-full">
        <DashboardCard
          icon={<CalendarRange strokeWidth={1} />}
          title="Project timeline"
        >
          <div className="w-full flex h-full items-center space-x-[1px]">
            <div className="w-full flex h-10 bg-slate-400 hover:scale-y-110 hover:shadow-md hover:shadow-slate-500 transition-all duration-200" />
            <div className="w-full flex h-10 bg-slate-400 hover:scale-y-110 hover:shadow-md hover:shadow-slate-500 transition-all duration-200" />
            <div className="w-full flex h-10 bg-slate-400 hover:scale-y-110 hover:shadow-md hover:shadow-slate-500 transition-all duration-200" />
            <div className="w-full flex h-40 bg-white-500 border rounded-md hover:scale-y-105 transition-all duration-200 shadow-md" />
            <div className="w-full flex h-10 bg-stone-600 hover:scale-y-110 hover:shadow-md hover:shadow-stone-500 transition-all duration-200" />
            <div className="w-full flex h-10 bg-stone-600 hover:scale-y-110 hover:shadow-md hover:shadow-stone-500 transition-all duration-200" />
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
