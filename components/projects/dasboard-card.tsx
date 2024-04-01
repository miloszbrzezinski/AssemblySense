import React from "react";
import { Separator } from "../ui/separator";

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const DashboardCard = ({
  title,
  icon,
  children,
}: DashboardCardProps) => {
  return (
    <div className="flex flex-col rounded-md border border-stone-200 bg-white w-full h-full shadow-sm">
      <div className="flex space-x-2 items-center p-2">
        {icon}
        <p className="text-2xl font-light select-none">{title}</p>
      </div>
      <Separator />
      {children}
    </div>
  );
};
