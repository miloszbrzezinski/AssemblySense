"use client";
import { cn } from "@/lib/utils";
import { MemberWithProfile } from "@/types";
import { Department } from "@prisma/client";
import { useRouter } from "next/navigation";

export const DepartmentItem = ({ department }: { department: Department }) => {
  const router = useRouter();
  const onClick = () => {
    //router.push(`projects/${department.id}/dashboard`);
  };
  return (
    <div
      onClick={onClick}
      className="group bg-white h-16 items-center justify-between flex p-5 hover:bg-slate-50 dark:bg-neutral-900 dark:hover:bg-neutral-900/80 select-none"
    >
      <div>
        <p className="text-xl space-x-2">
          <span className="font-light">{department.name}</span>
        </p>
      </div>
    </div>
  );
};
