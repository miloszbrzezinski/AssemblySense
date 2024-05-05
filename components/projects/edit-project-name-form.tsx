"use client";
import * as z from "zod";
import { Project } from "@prisma/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProjectNameSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { editProjectName } from "@/actions/project";
import { toast } from "sonner";

interface EditProjectNameFormProps {
  profileId: string;
  workspaceId: string;
  project: Project;
}

export const EditProjectNameForm = ({
  profileId,
  workspaceId,
  project,
}: EditProjectNameFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof EditProjectNameSchema>>({
    resolver: zodResolver(EditProjectNameSchema),
    defaultValues: {
      projectName: "",
    },
  });

  useEffect(() => {
    form.setValue("projectName", project.name);
  }, [form]);

  const onSubmit = (values: z.infer<typeof EditProjectNameSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      editProjectName(profileId, workspaceId, project.id, values).then(
        (data) => {
          setError(data.error);
          if (data.success) {
            toast(data.success, {
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
            router.refresh();
          }
        }
      );
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
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-light">Project Name</FormLabel>
              <FormControl>
                <div className="flex space-x-2">
                  <Input {...field} disabled={isPending} className="w-72" />
                  <Button>Rename</Button>
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
