"use client";
import { UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Workspace } from "@prisma/client";

interface NavbarButtonProps {
  workspace: Workspace;
}

export const NavbarButton = ({ workspace }: NavbarButtonProps) => {
  const { onOpen } = useModal();
  return (
    <>
      <Button variant="outline" className="space-x-2 px-3">
        <p>Add department</p>
      </Button>
      <Button
        onClick={() => {
          onOpen("inviteUser", { workspace });
        }}
        className="space-x-2 px-3 bg-stone-500 text-stone-50"
      >
        <UserPlus strokeWidth={1} />
        <p>Add member</p>
      </Button>
    </>
  );
};
