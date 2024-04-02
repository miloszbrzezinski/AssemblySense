"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateCustomerSchema, CreateWorkspaceSchema } from "@/schemas";
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
import { Textarea } from "../ui/textarea";
import { createCustomer } from "@/actions/customer";

interface CreateCustomerFormProps {
  userId: string;
  workspaceId: string;
}

export const CreateCustomerForm = ({
  userId,
  workspaceId,
}: CreateCustomerFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateCustomerSchema>>({
    resolver: zodResolver(CreateCustomerSchema),
    defaultValues: {
      customerName: "",
      customerDescription: "",
    },
  });

  if (!userId) {
    return <p>No user</p>;
  }

  const onSubmit = (values: z.infer<typeof CreateCustomerSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createCustomer(userId, workspaceId, values).then((data) => {
        // setError(data.error);
        if (data) {
          router.push(`/workspace/${workspaceId}/customers`);
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
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-light">Name</FormLabel>
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
              Create customer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
