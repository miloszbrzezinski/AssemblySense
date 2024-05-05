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
import { Flag } from "lucide-react";
import { useForm } from "react-hook-form";
import { ReportProjectIssueSchema } from "@/schemas";
import { startTransition, useState } from "react";
import { createComponent } from "@/actions/library";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { reportProjectNetworkIssue } from "@/actions/project-issues";

export const ReportProjectModal = () => {
  //const [problemSource, setProblemSource] = useState<string>();
  let problemSource: JSX.Element = <div></div>;
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "reportProjectProblem";
  const router = useRouter();

  const form = useForm<z.infer<typeof ReportProjectIssueSchema>>({
    resolver: zodResolver(ReportProjectIssueSchema),
    defaultValues: {
      problemName: "",
      problemDescription: "",
    },
  });

  const {
    profileId,
    workspaceId,
    projectId,
    assemblyGroup,
    assemblyProcess,
    projectTarget,
    projectComponent,
    projectNetwork,
    projectConnection,
    componentEvent,
    addressIO,
    sequence,
    sequenceStep,
  } = data;

  if (!profileId || !workspaceId || !projectId) {
    return;
  }

  const isLoading = form.formState.isSubmitting;

  if (projectNetwork) {
    problemSource = (
      <div>
        <h2 className="text-xl font-light">
          Project network:{" "}
          <span className="font-normal">{projectNetwork.name}</span>
          <br /> problem report.
        </h2>
      </div>
    );
  }

  const onSubmit = (values: z.infer<typeof ReportProjectIssueSchema>) => {
    startTransition(() => {
      if (projectNetwork) {
        reportProjectNetworkIssue(
          profileId,
          workspaceId,
          projectId,
          values,
          projectNetwork.id
        ).then((data) => {
          // setError(data.error);
          if (data) {
            router.refresh();
            onClose();
          }
        });
      }
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-neutral-900 dark:text-gray-100 overflow-hidden">
        <DialogHeader className="p-0">
          <DialogTitle className="text-3xl font-light flex items-center space-x-2">
            <Flag strokeWidth={1} className="h-8 w-8" />
            <p>Report problem</p>
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            <Separator className="my-2 dark:bg-neutral-500" />
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="w-full space-y-1 pl-2">
              <h4>{problemSource}</h4>
            </div>
            <FormField
              control={form.control}
              name="problemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs dark:text-neutral-200">
                    Problem title
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="text-lg bg-stone-100/50 dark:bg-neutral-800 dark:border-neutral-400 border-2 border-stone-800 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
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
              name="problemDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs dark:text-neutral-200">
                    Problem description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      className="h-96 text-lg bg-stone-100/50 dark:bg-neutral-800 dark:border-neutral-400 border-2 border-stone-800 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="py-4">
              <Button type="submit" disabled={isLoading} className="w-full">
                Report
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};