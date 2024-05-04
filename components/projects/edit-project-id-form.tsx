"use client";
import * as z from "zod";
import { Project } from "@prisma/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProjectIdSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface EditProjectNameFormProps {
  profileId: string;
  workspaceId: string;
  project: Project;
}

export const EditProjectIdForm = ({
  profileId,
  workspaceId,
  project,
}: EditProjectNameFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof EditProjectIdSchema>>({
    resolver: zodResolver(EditProjectIdSchema),
    defaultValues: {
      projectId: "",
    },
  });

  useEffect(() => {
    form.setValue("projectId", project.projectNo);
  }, [form]);

  const onSubmit = (values: z.infer<typeof EditProjectIdSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      //   createProject(userId, workspaceId, values).then((data) => {
      //     // setError(data.error);
      //     if (data.success) {
      //       router.push(`/workspace/${workspaceId}/projects`);
      //     }
      //   });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex items-center"
      >
        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-light">Project ID</FormLabel>
              <FormControl>
                <div className="flex space-x-2">
                  <Input {...field} disabled={isPending} className="w-36" />
                  <Button>Save</Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
