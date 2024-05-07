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

export const AddProjectStageModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "addProjectStage";
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateProjectStageSchema>>({
    resolver: zodResolver(CreateProjectStageSchema),
    defaultValues: {
      stageName: "",
      stageDescription: "",
    },
  });

  const { profileId, projectId, workspaceId, projectTarget } = data;

  useEffect(() => {
    if (!projectTarget) {
      form.setValue("stageName", "");
      form.setValue("stageDescription", "");
    }
  }, [form, projectTarget]);

  if (!profileId || !projectId || !workspaceId) {
    return;
  }

  const onSubmit = (values: z.infer<typeof CreateProjectStageSchema>) => {
    startTransition(() => {
      createProjectStage(profileId, workspaceId, projectId, values).then(
        (data) => {
          // setError(data.error);
          if (data) {
            router.refresh();
            onClose();
          }
        }
      );
    });
  };

  const isLoading = false;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-neutral-900 dark:text-gray-100 overflow-hidden">
        <DialogHeader className="p-0">
          <DialogTitle className="text-3xl font-light flex items-center space-x-2">
            <Rocket strokeWidth={1} className="w-10 h-10" />
            <p>Add project stage</p>
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
            <DialogFooter className="py-4">
              <Button disabled={isLoading} className="w-full">
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
