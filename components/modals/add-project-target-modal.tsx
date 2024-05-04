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
import {
  CalendarCheck,
  Component,
  Hourglass,
  Puzzle,
  Target,
  Timer,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { CreateProjectTargetSchema } from "@/schemas";
import { startTransition, useState } from "react";
import { createComponent } from "@/actions/library";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { createProcess } from "@/actions/assembly-group";
import { ProjectTargetType } from "@prisma/client";
import { Textarea } from "../ui/textarea";
import { createProjectTarget } from "@/actions/project-target";
import { cn } from "@/lib/utils";

export const AddProjectTargetModal = () => {
  const [selectedType, setSelectedType] = useState<ProjectTargetType>(
    ProjectTargetType.GENERAL
  );
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "addProjectTarget";
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateProjectTargetSchema>>({
    resolver: zodResolver(CreateProjectTargetSchema),
    defaultValues: {
      targetName: "",
      targetValue: "",
      targetDescription: "",
      targetType: ProjectTargetType.GENERAL,
    },
  });

  const { profileId, projectId, workspaceId } = data;

  if (!profileId || !projectId || !workspaceId) {
    return;
  }

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (values: z.infer<typeof CreateProjectTargetSchema>) => {
    startTransition(() => {
      createProjectTarget(profileId, workspaceId, projectId, values).then(
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

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-neutral-900 dark:text-gray-100 overflow-hidden">
        <DialogHeader className="p-0">
          <DialogTitle className="text-3xl font-light flex items-center space-x-2">
            <Target strokeWidth={1} className="w-10 h-10" />
            <p>Add project target</p>
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            <Separator className="my-2 dark:bg-neutral-500" />
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="targetName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs dark:text-neutral-200">
                    Target name
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
              name="targetDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs dark:text-neutral-200">
                    Target description
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
            <Separator />
            <FormLabel className="uppercase text-xs dark:text-neutral-200">
              Target type
            </FormLabel>
            <div className="flex items-center justify-between space-x-2">
              <div
                className={cn(
                  "cursor-pointer relative group hover:opacity-75 transition w-1/4"
                )}
                onClick={() => {
                  setSelectedType(ProjectTargetType.GENERAL);
                }}
              >
                <input
                  type="radio"
                  id="targetIcon"
                  className="hidden"
                  checked={selectedType === ProjectTargetType.GENERAL}
                  value={ProjectTargetType.GENERAL}
                  {...form.register("targetType", {
                    shouldUnregister: true,
                  })}
                />
                <div
                  className={cn(
                    "flex flex-col w-full items-center justify-center border-2 border-stone-700 p-2 rounded-md hover:bg-stone-100 whitespace-nowrap",
                    selectedType === ProjectTargetType.GENERAL &&
                      "bg-slate-300 hover:bg-slate-200"
                  )}
                >
                  <Target strokeWidth={1} className="w-14 h-14" />
                  <p>General</p>
                </div>
              </div>
              <div
                className={cn(
                  "cursor-pointer relative group hover:opacity-75 transition w-1/4"
                )}
                onClick={() => {
                  setSelectedType(ProjectTargetType.WORKING_TIME);
                }}
              >
                <input
                  type="radio"
                  id="targetIcon"
                  className="hidden"
                  checked={selectedType === ProjectTargetType.WORKING_TIME}
                  value={ProjectTargetType.WORKING_TIME}
                  {...form.register("targetType", {
                    shouldUnregister: true,
                  })}
                />
                <div
                  className={cn(
                    "flex flex-col w-full items-center justify-center border-2 border-stone-700 p-2 rounded-md hover:bg-stone-100 whitespace-nowrap",
                    selectedType === ProjectTargetType.WORKING_TIME &&
                      "bg-slate-300 hover:bg-slate-200"
                  )}
                >
                  <Timer strokeWidth={1} className="w-14 h-14" />
                  <p>Working time</p>
                </div>
              </div>
              <div
                className={cn(
                  "cursor-pointer relative group hover:opacity-75 transition w-1/4"
                )}
                onClick={() => {
                  setSelectedType(ProjectTargetType.TIME);
                }}
              >
                <input
                  type="radio"
                  id="targetIcon"
                  className="hidden"
                  checked={selectedType === ProjectTargetType.TIME}
                  value={ProjectTargetType.TIME}
                  {...form.register("targetType", {
                    shouldUnregister: true,
                  })}
                />
                <div
                  className={cn(
                    "flex flex-col w-full items-center justify-center border-2 border-stone-700 p-2 rounded-md hover:bg-stone-100 whitespace-nowrap",
                    selectedType === ProjectTargetType.TIME &&
                      "bg-slate-300 hover:bg-slate-200"
                  )}
                >
                  <Hourglass strokeWidth={1} className="w-14 h-14" />
                  <p>Time</p>
                </div>
              </div>
              <div
                className={cn(
                  "cursor-pointer relative group hover:opacity-75 transition w-1/4"
                )}
                onClick={() => {
                  setSelectedType(ProjectTargetType.DATE);
                }}
              >
                <input
                  type="radio"
                  id="targetIcon"
                  className="hidden"
                  checked={selectedType === ProjectTargetType.DATE}
                  value={ProjectTargetType.DATE}
                  {...form.register("targetType", {
                    shouldUnregister: true,
                  })}
                />
                <div
                  className={cn(
                    "flex flex-col w-full items-center justify-center border-2 border-stone-700 p-2 rounded-md hover:bg-stone-100 whitespace-nowrap",
                    selectedType === ProjectTargetType.DATE &&
                      "bg-slate-300 hover:bg-slate-200"
                  )}
                >
                  <CalendarCheck strokeWidth={1} className="w-14 h-14" />
                  <p>Date</p>
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="targetValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs dark:text-neutral-200">
                    Target value
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type={"text"}
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
