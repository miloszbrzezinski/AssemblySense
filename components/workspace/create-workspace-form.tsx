"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateWorkspaceSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { createWorkspace } from "@/actions/workspace";
import { redirect, useRouter } from "next/navigation";

interface CreateWorkspaceFormProps {
  userId: string;
}

export const CreateWorkspaceForm = ({ userId }: CreateWorkspaceFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateWorkspaceSchema>>({
    resolver: zodResolver(CreateWorkspaceSchema),
    defaultValues: {
      workspaceName: "",
    },
  });

  if (!userId) {
    return <p>No user</p>;
  }

  const onSubmit = (values: z.infer<typeof CreateWorkspaceSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createWorkspace(userId, values.workspaceName).then((data) => {
        // setError(data.error);
        if (data.id) {
          router.push(`/workspace/${data.id}/home`);
        }
      });
    });
  };

  return (
    <div className="w-[70%]">
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
    </div>
  );
};
