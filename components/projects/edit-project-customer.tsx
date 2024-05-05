"use client";
import * as z from "zod";
import { Customer, Project } from "@prisma/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProjectCustomerSchema, EditProjectIdSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { editProjectCustomer, editProjectId } from "@/actions/project";
import { toast } from "sonner";

interface EditProjectNameFormProps {
  profileId: string;
  workspaceId: string;
  project: Project;
  customers: Customer[];
}

export const EditProjectCustomerForm = ({
  profileId,
  workspaceId,
  project,
  customers,
}: EditProjectNameFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const cid = project.customerId;

  const form = useForm<z.infer<typeof EditProjectCustomerSchema>>({
    resolver: zodResolver(EditProjectCustomerSchema),
    defaultValues: {
      projectCustomer: cid,
    },
  });

  useEffect(() => {
    form.setValue("projectCustomer", project.customerId);
  }, [form, project.customerId]);

  const onSubmit = (values: z.infer<typeof EditProjectCustomerSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      editProjectCustomer(profileId, workspaceId, project.id, values).then(
        (data) => {
          setError(data.error);
          toast(data.success, {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          router.refresh();
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
          name="projectCustomer"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-light">Customer</FormLabel>
              <FormControl>
                <div className="flex space-x-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="border border-stone-300 w-72">
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
