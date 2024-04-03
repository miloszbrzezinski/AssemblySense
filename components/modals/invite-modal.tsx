"use client";

import { useState } from "react";

import { Check, Copy, RefreshCw, UserPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const InviteUsersModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const { workspace } = data;

  const isModalOpen = isOpen && type === "inviteUser";

  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!workspace) {
    return;
  }

  const inviteUrl = `${origin}/invite/${workspace.inviteCode}`;

  const onCopyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onCopyCode = () => {
    navigator.clipboard.writeText(workspace.inviteCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      // const response = await axios.patch(
      //   `/api/workspaces/${workspace?.id}/invite-code`,
      // );

      // onOpen("inviteUser", { workspace: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-neutral-900 dark:text-gray-100 overflow-hidden">
        <DialogHeader className="p-0">
          <DialogTitle className="text-3xl font-light flex items-center space-x-2">
            <UserPlus strokeWidth={1.5} className="w-7 h-7" />
            <p>Invite users</p>
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            <Separator className="my-2 dark:bg-neutral-500 " />
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Tabs defaultValue="link">
            <div className="mb-4">
              <TabsList className="dark:bg-neutral-950 bg-stone-200">
                <TabsTrigger
                  value="link"
                  className="data-[state=active]:bg-neutral-400 data-[state=active]:text-neutral-900"
                >
                  Link
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="data-[state=active]:bg-neutral-400 data-[state=active]:text-neutral-900"
                >
                  Code
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="link" className="">
              <Label className="uppercase text-sm text-stone-700 dark:text-neutral-300">
                Workspace invite link
              </Label>
              <div className="flex items-center mt-2 gap-x-2">
                <Input
                  disabled={isLoading}
                  className="resize-none border-2 border-stone-700 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                  value={inviteUrl}
                />
                <Button
                  variant="ghost"
                  disabled={isLoading}
                  onClick={onCopyLink}
                  size="icon"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <Button
                onClick={onNew}
                disabled={isLoading}
                variant="link"
                size="sm"
                className="text-xs text-stone-700 dark:text-neutral-300 mt-4"
              >
                Generate a new link
                <RefreshCw className="w-4 h-4 ml-2" />
              </Button>
            </TabsContent>
            <TabsContent value="code" className="">
              <Label className="uppercase text-sm text-stone-700 dark:text-neutral-300">
                Workspace invite code
              </Label>
              <div className="flex items-center mt-2 gap-x-2">
                <Input
                  disabled={isLoading}
                  className="resize-none border-2 border-stone-700 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                  value={workspace.inviteCode}
                />
                <Button
                  variant="ghost"
                  disabled={isLoading}
                  onClick={onCopyCode}
                  size="icon"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <Button
                onClick={onNew}
                disabled={isLoading}
                variant="link"
                size="sm"
                className="text-xs text-stone-700 dark:text-neutral-300 mt-4"
              >
                Generate a new code
                <RefreshCw className="w-4 h-4 ml-2" />
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
