"use client";

import { startTransition, useState, useTransition } from "react";

import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { createWorkspace } from "@/actions/workspace";
import { useModal } from "@/hooks/use-modal-store";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateWorkspaceSchema } from "@/schemas";
import { Button } from "../ui/button";

export const CreateWorkspaceModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { profileId } = data;
  const router = useRouter();

  const isModalOpen = isOpen && type === "addWorkspace";

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateWorkspaceSchema>>({
    resolver: zodResolver(CreateWorkspaceSchema),
    defaultValues: {
      workspaceName: "",
    },
  });

  if (!profileId) {
    return;
  }

  const onSubmit = (values: z.infer<typeof CreateWorkspaceSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createWorkspace(profileId, values.workspaceName).then((data) => {
        // setError(data.error);
        if (data.id) {
          router.push(`/workspace/${data.id}/home`);
        }
      });
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-neutral-900 dark:text-gray-100 overflow-hidden">
        <DialogHeader className="p-0">
          <DialogTitle className="text-3xl font-light flex items-center space-x-2">
            <Plus strokeWidth={1.5} className="w-7 h-7" />
            <p>Create workspace</p>
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            <Separator className="my-2 dark:bg-neutral-500 " />
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full flex flex-col"
          >
            <div className="space-y-4 w-full">
              <FormField
                control={form.control}
                name="workspaceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Acme Inc."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Create workspace
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
