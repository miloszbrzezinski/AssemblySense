"use client";
import { File, Puzzle } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Component } from "@prisma/client";

interface ComponentItemProps {
  component: Component;
  workspaceId: string;
}

export const ComponentItem = ({
  component,
  workspaceId,
}: ComponentItemProps) => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className="p-1 pl-5 h-min justify-start w-full rounded-none space-x-2 hover:bg-slate-200"
      onClick={() => {
        router.push(`/workspace/${workspaceId}/library/${component.id}`);
      }}
    >
      <Puzzle strokeWidth={1} className="w-5 h-5" />
      <div className="space-x-1 flex">
        <p className="font-light">{component.manufacturer}</p>
        <p className="font-extralight">{component.name}</p>
      </div>
    </Button>
  );
};
