"use client";
import { Cog, FileClock, Rocket, Target, Users } from "lucide-react";
import { Button } from "../../ui/button";
import { useParams, useRouter } from "next/navigation";
import { AssemblyGroupWithProcesses } from "@/types";
import {
  ProjectComponent,
  ProjectMember,
  ProjectNetwork,
} from "@prisma/client";
import { Separator } from "@/components/ui/separator";

interface ProjectSettingsSidebarProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  assemblyGroups: AssemblyGroupWithProcesses[];
  projectMembers: ProjectMember[];
  projectComponents: ProjectComponent[];
  projectNetworks: ProjectNetwork[];
}

export const ProjectSettingsSidebar = ({
  profileId,
  workspaceId,
  projectId,
  assemblyGroups,
  projectMembers,
  projectComponents,
  projectNetworks,
}: ProjectSettingsSidebarProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="w-72 h-full border-r pt-2 pb-20 border-stone-300 shadow-md overflow-scroll">
      <Button
        onClick={() => {
          router.push(
            `/workspace/${params.workspaceId}/projects/${params.projectId}/settings/general`
          );
        }}
        variant="secondary"
        className="w-full justify-start space-x-2 hover:bg-stone-200/60 rounded-none"
      >
        <Cog strokeWidth={1} />
        <p className="font-light">General</p>
      </Button>
      <Separator className="my-2" />
      <Button
        onClick={() => {
          router.push(
            `/workspace/${params.workspaceId}/projects/${params.projectId}/settings/stages`
          );
        }}
        variant="secondary"
        className="w-full justify-between space-x-2 hover:bg-stone-200/60 rounded-none"
      >
        <div className="flex items-center justify-start space-x-2">
          <Rocket strokeWidth={1} />
          <p className="font-light">Project stages</p>
        </div>
      </Button>
      <Button
        onClick={() => {
          router.push(
            `/workspace/${params.workspaceId}/projects/${params.projectId}/settings/targets`
          );
        }}
        variant="secondary"
        className="w-full justify-start space-x-2 hover:bg-stone-200/60 rounded-none"
      >
        <Target strokeWidth={1} />
        <p className="font-light">Project targets</p>
      </Button>
      <Button
        onClick={() => {
          router.push(
            `/workspace/${params.workspaceId}/projects/${params.projectId}/settings/members`
          );
        }}
        variant="secondary"
        className="w-full justify-between space-x-2 hover:bg-stone-200/60 rounded-none"
      >
        <div className="flex items-center justify-start space-x-2">
          <Users strokeWidth={1} />
          <p className="font-light">Members</p>
        </div>
        <p className="font-light">{projectMembers.length}</p>
      </Button>
      <Separator className="my-2" />
      <Button
        onClick={() => {
          router.push(
            `/workspace/${params.workspaceId}/projects/${params.projectId}/settings/change-log`
          );
        }}
        variant="secondary"
        className="w-full justify-between space-x-2 hover:bg-stone-200/60 rounded-none"
      >
        <div className="flex items-center justify-start space-x-2">
          <FileClock strokeWidth={1} />
          <p className="font-light">Change log</p>
        </div>
      </Button>
    </div>
  );
};
