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
import { Puzzle, Replace } from "lucide-react";
import { useForm } from "react-hook-form";
import { CreateComponentSchema } from "@/schemas";
import { startTransition } from "react";
import { createComponent } from "@/actions/library";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";

export const CommitChangesModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "commitChanges";
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateComponentSchema>>({
    resolver: zodResolver(CreateComponentSchema),
    defaultValues: {
      componentName: "",
      componentManufacturer: "",
    },
  });

  const { profileId } = data;

  if (!profileId) {
    return;
  }

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (values: z.infer<typeof CreateComponentSchema>) => {
    // startTransition(() => {
    //   createComponent(
    //     profileId,
    //     componentCategory.workspaceId,
    //     componentCategory.id,
    //     values
    //   ).then((data) => {
    //     // setError(data.error);
    //     if (data) {
    //       router.refresh();
    //       onClose();
    //     }
    //   });
    // });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-neutral-900 dark:text-gray-100 overflow-hidden">
        <DialogHeader className="p-0">
          <DialogTitle className="text-3xl font-light flex items-center space-x-2">
            <Replace strokeWidth={1} className="h-8 w-8" />
            <p>Commit changes</p>
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            <Separator className="my-2 dark:bg-neutral-500" />
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* <h2 className="text-2xl font-medium text-stone-500">
              No changes to commit
            </h2> */}
            <div className="w-full space-y-1 pl-2">
              <div className="flex items-center space-x-2">
                <Checkbox className="w-5 h-5" />
                <h4 className="text-lg">OP103 -&gt; OP104</h4>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox className="w-5 h-5" />
                <h4 className="text-lg">added: Cognex 7905</h4>
              </div>
            </div>
            <FormField
              control={form.control}
              name="componentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs dark:text-neutral-200">
                    Commit message
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
                Commit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
