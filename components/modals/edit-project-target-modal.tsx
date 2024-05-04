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
import { startTransition, useEffect, useState } from "react";
import { createComponent } from "@/actions/library";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { createProcess } from "@/actions/assembly-group";
import { ProjectTargetType } from "@prisma/client";
import { Textarea } from "../ui/textarea";
import {
  createProjectTarget,
  editProjectTarget,
} from "@/actions/project-target";
import { cn } from "@/lib/utils";
import { Select, SelectItem, SelectTrigger } from "../ui/select";
import { SelectContent } from "@radix-ui/react-select";

export const EditProjectTargetModal = () => {
  const [selectedType, setSelectedType] = useState<ProjectTargetType>(
    ProjectTargetType.GENERAL
  );
  const [selectedTypeInput, setSelectedTypeInput] = useState<
    "text" | "number" | "time" | "date"
  >("text");
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "editProjectTarget";
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

  const { profileId, projectId, workspaceId, projectTarget } = data;

  useEffect(() => {
    if (projectTarget) {
      form.setValue("targetName", projectTarget.name);
      form.setValue("targetValue", projectTarget.target);
      form.setValue("targetDescription", projectTarget.description);
      setSelectedType(projectTarget.projectTargetType);
      switch (projectTarget.projectTargetType) {
        case ProjectTargetType.GENERAL:
          setSelectedTypeInput("text");
          break;
        case ProjectTargetType.WORKING_TIME:
          setSelectedTypeInput("number");
          break;
        case ProjectTargetType.TIME:
          setSelectedTypeInput("number");
          break;
        case ProjectTargetType.DATE:
          setSelectedTypeInput("date");
          break;
      }
    }
  }, [form, projectTarget]);

  if (!profileId || !projectId || !workspaceId || !projectTarget) {
    return;
  }

  const onSubmit = (values: z.infer<typeof CreateProjectTargetSchema>) => {
    startTransition(() => {
      editProjectTarget(
        profileId,
        workspaceId,
        projectId,
        projectTarget.id,
        values,
        selectedType
      ).then((data) => {
        // setError(data.error);
        if (data) {
          router.refresh();
          onClose();
        }
      });
    });
  };

  const selectInputType = (targetType: ProjectTargetType) => {
    setSelectedType(targetType);
    switch (targetType) {
      case ProjectTargetType.GENERAL:
        setSelectedTypeInput("text");
        break;
      case ProjectTargetType.WORKING_TIME:
        setSelectedTypeInput("number");
        break;
      case ProjectTargetType.TIME:
        setSelectedTypeInput("number");
        break;
      case ProjectTargetType.DATE:
        setSelectedTypeInput("date");
        break;
    }
  };

  const isLoading = false;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-neutral-900 dark:text-gray-100 overflow-hidden">
        <DialogHeader className="p-0">
          <DialogTitle className="text-3xl font-light flex items-center space-x-2">
            <Target strokeWidth={1} className="w-10 h-10" />
            <p>Edit project target</p>
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
            <FormField
              control={form.control}
              name="targetType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs dark:text-neutral-200">
                    Target type
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between space-x-2">
                      <div
                        className={cn(
                          "cursor-pointer relative group hover:opacity-75 transition w-1/4"
                        )}
                        onClick={() => {
                          selectInputType(ProjectTargetType.GENERAL);
                        }}
                      >
                        <input
                          type="radio"
                          id="targetType"
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
                          selectInputType(ProjectTargetType.WORKING_TIME);
                        }}
                      >
                        <input
                          type="radio"
                          id="targetType"
                          className="hidden"
                          checked={
                            selectedType === ProjectTargetType.WORKING_TIME
                          }
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
                          selectInputType(ProjectTargetType.TIME);
                        }}
                      >
                        <input
                          type="radio"
                          id="targetType"
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
                          selectInputType(ProjectTargetType.DATE);
                        }}
                      >
                        <input
                          type="radio"
                          id="targetType"
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
                          <CalendarCheck
                            strokeWidth={1}
                            className="w-14 h-14"
                          />
                          <p>Date</p>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      type={selectedTypeInput}
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
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
