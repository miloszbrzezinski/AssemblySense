import React from "react";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";

interface DashboardCardProps {
  title: string;
  addButton?: React.ReactNode;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const DashboardCard = ({
  title,
  icon,
  addButton,
  children,
}: DashboardCardProps) => {
  return (
    <div className="flex flex-col rounded-md border border-stone-200 dark:border-neutral-500 bg-white dark:bg-neutral-950 w-full h-full shadow-sm">
      <div className="flex space-x-2 items-center justify-between p-2 h-14">
        <div className="flex space-x-2 items-center">
          {icon}
          <p className="text-2xl font-light select-none">{title}</p>
        </div>
        {addButton}
      </div>
      <Separator />
      <div className="overflow-y-scroll rounded-b-md">{children}</div>
    </div>
  );
};
