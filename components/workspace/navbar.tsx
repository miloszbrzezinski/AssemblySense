import { Menu } from "lucide-react";
import { Logo } from "../logo";
import { WorkspaceSearch } from "./search";
import WorkspaceButton from "./workspace-button";
import { getAllWorkspaceByUser } from "@/actions/workspace";
import { Workspace } from "@prisma/client";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { initialProfile } from "@/lib/initial-profile";

export const Navbar = async ({ workspaceName }: { workspaceName: string }) => {
  const profile = await initialProfile();
  const workspaces = await getAllWorkspaceByUser(profile.id);

  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b dark:border-neutral-700 shadow-sm bg-white dark:bg-neutral-900 flex items-center">
      <div className="flex items-center gap-x-4">
        <div className="flex items-center justify-center space-x-2">
          <Menu strokeWidth={1.5} className="w-7 h-7 block md:hidden" />
          <Logo />
          <span className="text-xl font-thin">|</span>
          <WorkspaceButton
            workspaceName={workspaceName}
            workspaces={workspaces}
          />
        </div>
      </div>
      <div className="ml-auto flex items-center md:gap-x-2">
        <WorkspaceSearch data={[]} />
        <ModeToggle />
        <div className="h-10 w-20 items-center justify-center flex">
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
