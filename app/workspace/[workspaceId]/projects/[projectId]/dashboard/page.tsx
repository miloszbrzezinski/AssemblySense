import { DashboardCard } from "@/components/projects/dashboard-cards/dasboard-card";
import { ProjectMembersCard } from "@/components/projects/dashboard-cards/project-members-card";
import { ProjectProblemsCard } from "@/components/projects/dashboard-cards/project-problems-card";
import { ProjectStagesCard } from "@/components/projects/dashboard-cards/project-stages-card";
import { ProjectTargetsCard } from "@/components/projects/dashboard-cards/project-targets-card";
import { ProjectTasksCard } from "@/components/projects/dashboard-cards/project-tasks-card";
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
          projectStages: {
            orderBy: {
              order: "asc",
            },
          },
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
        <ProjectTasksCard
          assemblyGroups={project.assemblyGroups}
          projectProblems={project.projectIssues}
        />
        <ProjectProblemsCard
          workspaceId={params.workspaceId}
          projectId={project.id}
          assemblyGroups={project.assemblyGroups}
          projectProblems={project.projectIssues}
        />
      </div>
      <div className="flex h-1/3 w-full">
        <ProjectStagesCard projectStages={project.projectStages} />
      </div>
    </div>
  );
}
