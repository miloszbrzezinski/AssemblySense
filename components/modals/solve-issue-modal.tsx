"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Flag, Puzzle, Replace } from "lucide-react";
import { useForm } from "react-hook-form";
import { SolveProjectIssueSchema } from "@/schemas";
import { startTransition } from "react";
import { createComponent } from "@/actions/library";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { solveProjectIssue } from "@/actions/project-issues";
import { toast } from "sonner";

export const SolveIssueModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "solveIssue";
  const router = useRouter();

  const form = useForm<z.infer<typeof SolveProjectIssueSchema>>({
    resolver: zodResolver(SolveProjectIssueSchema),
    defaultValues: {
      projectIssueSolution: "",
    },
  });

  const { profileId, workspaceId, projectIssue } = data;

  if (!profileId || !workspaceId || !projectIssue) {
    return;
  }

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (values: z.infer<typeof SolveProjectIssueSchema>) => {
    startTransition(() => {
      solveProjectIssue(
        profileId,
        workspaceId,
        projectIssue.projectId,
        projectIssue.id,
        values
      ).then((data) => {
        // setError(data.error);
        if (data) {
          toast(data.success, {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          router.refresh();
          onClose();
        }
      });
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-neutral-900 dark:text-gray-100 overflow-hidden">
        <DialogHeader className="p-0">
          <DialogTitle className="text-3xl font-light flex items-center space-x-2">
            <Flag strokeWidth={1} className="h-8 w-8" />
            <p>Solve issue</p>
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            <Separator className="my-2 dark:bg-neutral-500" />
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="projectIssueSolution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs dark:text-neutral-200">
                    Solution
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      className="h-96 resize-none bg-stone-100/50 dark:bg-neutral-800 dark:border-neutral-400 border-2 border-stone-800 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="py-4">
              <Button disabled={isLoading} className="w-full">
                Solve
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
