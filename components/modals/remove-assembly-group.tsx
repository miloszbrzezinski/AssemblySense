"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { removeAssemblyGroup } from "@/actions/assembly-group";

export const RemoveAssemblyGroupModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "removeAssemblyGroup";
  const { profileId, workspaceId, projectId, groupId } = data;

  if (!profileId || !workspaceId || !projectId || !groupId) {
    return;
  }

  const onClick = async () => {
    startTransition(() => {
      removeAssemblyGroup(profileId, workspaceId, projectId, groupId).then(
        (data) => {
          // setError(data.error);
          if (data.success) {
            toast(data.success, {
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
            onClose();
            router.refresh();
          }
        }
      );
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-neutral-950 dark:text-gray-100 overflow-hidden p-0 gap-0">
        <DialogHeader className="p-2">
          <DialogTitle className="text-3xl font-light flex items-center space-x-2">
            Remove control group
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-zinc-500 dark:text-neutral-400 p-3">
          Are you sure you want to do this? <br />
          Control group will be permanently removed.
        </DialogDescription>
        <DialogFooter className="p-4 bg-stone-200 dark:bg-neutral-900">
          <Button disabled={isLoading} variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isLoading} variant="destructive" onClick={onClick}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
