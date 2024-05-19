import { Frame, Menu } from "lucide-react";
import { Logo } from "../logo";
import { WorkspaceSearch } from "./search";
import WorkspaceButton from "./workspace-button";
import { getAllWorkspaceByUser } from "@/actions/workspace";
import { Workspace } from "@prisma/client";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";

type searchData = {
  name: string;
  id: string;
};

export const Navbar = async ({
  activeWorkspace,
}: {
  activeWorkspace: Workspace;
}) => {
  const profile = await initialProfile();
  const workspaces = await getAllWorkspaceByUser(profile.id);

  const projects = await db.project.findMany({
    where: {
      workspaceId: activeWorkspace.id,
    },
  });

  const searchDataProjects: searchData[] = [];

  projects.forEach((p) => {
    searchDataProjects.push({
      name: `${p.projectNo.toUpperCase()}: ${p.name}`,
      id: p.id,
    });
  });

  const components = await db.component.findMany({
    where: {
      category: {
        workspaceId: activeWorkspace.id,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      category: {
        name: "asc",
      },
    },
  });

  const searchDataComponents: searchData[] = [];

  components.forEach((p) => {
    searchDataComponents.push({
      name: `${p.category.name}: ${p.manufacturer} ${p.name}`,
      id: p.id,
    });
  });

  const members = await db.member.findMany({
    where: {
      workspaceId: activeWorkspace.id,
    },
    include: {
      profile: true,
    },
  });

  const searchDataMembers: searchData[] = [];

  members.forEach((p) => {
    searchDataMembers.push({
      name: `${p.profile.name} ${p.profile.lastName}`,
      id: p.id,
    });
  });

  return (
    <nav className="fixed z-50 top-0 md:px-4 px-2 w-full h-14 border-b dark:border-neutral-700 shadow-sm bg-white dark:bg-neutral-900 flex items-center">
      <div className="flex items-center gap-x-4">
        <div className="flex items-center justify-center md:space-x-2 space-x-1">
          <Logo />
          <span className="text-xl font-thin">|</span>
          <WorkspaceButton
            workspaceName={activeWorkspace.name}
            workspaces={workspaces}
          />
        </div>
      </div>
      <div className="ml-auto flex items-center md:gap-x-2">
        <WorkspaceSearch
          data={[
            {
              label: "Projects",
              type: "project",
              data: searchDataProjects,
            },
            {
              label: "Components",
              type: "component",
              data: searchDataComponents,
            },
            {
              label: "Members",
              type: "member",
              data: searchDataMembers,
            },
          ]}
        />
        <ModeToggle />
        <div className="h-10 md:w-20 items-center justify-center flex">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
};
