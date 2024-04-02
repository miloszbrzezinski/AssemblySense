"use client";
import { cn } from "@/lib/utils";
import { ProjectWithCustomer } from "@/types";
import { Customer, Project } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export const CustomerItem = ({ customer }: { customer: Customer }) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`customers/${customer.id}`);
  };
  return (
    <div
      onClick={onClick}
      className="group bg-white h-16 items-center justify-between flex p-5 hover:bg-slate-50 dark:bg-neutral-900 dark:hover:bg-neutral-900/80 select-none"
    >
      <div>
        <p className="text-xl space-x-2">
          <span className="font-light">{customer.name}</span>
        </p>
      </div>
    </div>
  );
};
