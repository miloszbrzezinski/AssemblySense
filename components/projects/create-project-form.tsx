"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateProjectSchema, CreateWorkspaceSchema } from "@/schemas";
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
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { createProject } from "@/actions/project";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Customer } from "@prisma/client";
import { toast } from "sonner";

interface CreateProjectFormProps {
  userId: string;
  workspaceId: string;
  customers: Customer[];
}

export const CreateProjectForm = ({
  userId,
  workspaceId,
  customers,
}: CreateProjectFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      projectId: "",
      projectName: "",
      projectCustomer: "",
      customerDescription: "",
    },
  });

  if (!userId) {
    return <p>No user</p>;
  }

  const onSubmit = (values: z.infer<typeof CreateProjectSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createProject(userId, workspaceId, values).then((data) => {
        setError(data.error);
        if (data.success) {
          toast(data.success, {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          router.push(`/workspace/${workspaceId}/projects`);
          router.refresh();
        }
      });
    });
  };

  return (
    <div className="w-[50%]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10 w-full flex flex-col"
        >
          <div className="space-y-8 w-full">
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-light">
                    Project ID
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="e.g. ID000"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-light">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="e.g. Bulbulator assembly line"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectCustomer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-light">Customer</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="border-2 border-stone-700">
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem
                            className="uppercase"
                            key={customer.id}
                            value={customer.id}
                          >
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-light">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-72 resize-none"
                      {...field}
                      disabled={isPending}
                      placeholder="e.g. Automotive company"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="w-full justify-end items-end flex">
            <Button disabled={isPending} type="submit" className="">
              Create project
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
