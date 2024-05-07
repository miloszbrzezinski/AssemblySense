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
import { Rocket } from "lucide-react";
import { useForm } from "react-hook-form";
import { CreateProjectStageSchema } from "@/schemas";
import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { createProjectStage } from "@/actions/project-stage";
import { toast } from "sonner";

export const EditProjectStageModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "editProjectStage";
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateProjectStageSchema>>({
    resolver: zodResolver(CreateProjectStageSchema),
    defaultValues: {
      stageName: "",
      stageDescription: "",
    },
  });

  const { profileId, projectId, workspaceId, projectStage } = data;

  useEffect(() => {
    if (projectStage) {
      form.setValue("stageName", projectStage.name);
      form.setValue("stageDescription", projectStage.description);
      if (projectStage.startDate) {
        const d = projectStage.startDate;
        const year = d.getFullYear();
        const month =
          d.getMonth() < 10 ? `0${d.getMonth()}` : `${d.getMonth()}`;
        const day = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;

        form.setValue("stageStartDate", `${year}-${month}-${day}`);
      }
      if (projectStage.deadline) {
        const d = projectStage.deadline;
        const year = d.getFullYear();
        const month =
          d.getMonth() < 10 ? `0${d.getMonth()}` : `${d.getMonth()}`;
        const day = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;

        form.setValue("stageDeadline", `${year}-${month}-${day}`);
      }
    }
  }, [form, projectStage]);

  if (!profileId || !projectId || !workspaceId) {
    return;
  }

  const onSubmit = (values: z.infer<typeof CreateProjectStageSchema>) => {
    startTransition(() => {
      // createProjectStage(profileId, workspaceId, projectId, values).then(
      //   (data) => {
      //     toast(data.success, {
      //       action: {
      //         label: "Undo",
      //         onClick: () => console.log("Undo"),
      //       },
      //     });
      //     router.refresh();
      //     onClose();
      //   }
      // );
    });
  };

  const isLoading = false;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-neutral-900 dark:text-gray-100 overflow-hidden">
        <DialogHeader className="p-0">
          <DialogTitle className="text-3xl font-light flex items-center space-x-2">
            <Rocket strokeWidth={1} className="w-10 h-10" />
            <p>Edit project stage</p>
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            <Separator className="my-2 dark:bg-neutral-500" />
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="stageName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs dark:text-neutral-200">
                    Stage name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="text"
                      className="bg-stone-100/50 dark:bg-neutral-800 dark:border-neutral-400 border-2 border-stone-800 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stageDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs dark:text-neutral-200">
                    Stage description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      className="bg-stone-100/50 dark:bg-neutral-800 dark:border-neutral-400 border-2 border-stone-800 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stageStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs dark:text-neutral-200">
                    Stage start date
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="date"
                      className="bg-stone-100/50 dark:bg-neutral-800 dark:border-neutral-400 border-2 border-stone-800 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stageDeadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs dark:text-neutral-200">
                    Stage deadline
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="date"
                      className="bg-stone-100/50 dark:bg-neutral-800 dark:border-neutral-400 border-2 border-stone-800 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
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
                Edit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
