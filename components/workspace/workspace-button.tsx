"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { Workspace } from "@prisma/client";
import { Plus } from "lucide-react";
import Link from "next/link";

const WorkspaceButton = ({
  profileId,
  workspaceName,
  workspaces,
}: {
  profileId: string;
  workspaceName: string;
  workspaces?: Workspace[];
}) => {
  const { onOpen } = useModal();
  if (!workspaces) {
    return <p>Error</p>;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-stone-200 dark:hover:bg-neutral-700/60 p-2 px-1 rounded-md outline-none">
        {workspaceName}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {workspaces.length > 1 ? (
          workspaces.map((workspace) => (
            <Link key={workspace.id} href={`/workspace/${workspace.id}/home`}>
              <DropdownMenuItem className="space-x-2">
                <p>{workspace.name}</p>
              </DropdownMenuItem>
            </Link>
          ))
        ) : (
          <p className="w-full text-center text-stone-400 dark:text-neutral-500 p-2">
            No workspaces
          </p>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            onOpen("addWorkspace", { profileId });
          }}
          className="space-x-2"
        >
          <Plus strokeWidth={1.2} />
          <p>Add workspace</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceButton;
