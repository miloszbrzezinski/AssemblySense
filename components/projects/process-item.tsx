"use client";
import { ComponentIcon, File, Puzzle } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { AssemblyProcess, Component } from "@prisma/client";

interface ProcessItemProps {
  assemblyProcess: AssemblyProcess;
  workspaceId: string;
}

export const ProcessItem = ({
  assemblyProcess,
  workspaceId,
}: ProcessItemProps) => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className="p-1 pl-5 h-min justify-start w-full rounded-none space-x-2 hover:bg-slate-200"
      onClick={() => {
        router.push(`/workspace/${workspaceId}/library/${assemblyProcess.id}`);
      }}
    >
      <ComponentIcon strokeWidth={1} className="w-5 h-5" />
      <div className="space-x-1 flex">
        <p className="font-light">{assemblyProcess.processId}</p>
        <p className="font-extralight">{assemblyProcess.name}</p>
      </div>
    </Button>
  );
};
