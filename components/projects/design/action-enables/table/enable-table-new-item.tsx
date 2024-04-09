"use client";
import { AssemblyGroup, AssemblyProcess } from "@prisma/client";
import { AssemblyGroupWithProcesses, ProjectComponentWithData } from "@/types";
import { MoreVertical, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface EnableTableNewItemProps {
  profileId: string;
  workspaceId: string;
  projectComponent: ProjectComponentWithData[];
}

export const EnableTableNewItem = ({
  profileId,
  workspaceId,
  projectComponent,
}: EnableTableNewItemProps) => {
  const [newItem, setNewItem] = useState(false);
  return (
    <div>
      {newItem && (
        <div className="group flex w-full h-10 bg-stone-300 space-x-[1px]">
          <div className="flex min-w-10 h-10 bg-white items-center group-hover:bg-slate-100">
            <Button
              variant="ghost"
              className="w-full h-full rounded-none p-0 hover:bg-slate-200  transition-none"
            >
              <X strokeWidth={1} className="hidden group-hover:block" />
            </Button>
          </div>
          <div className="group-hover:bg-slate-100 flex min-w-28 h-10 bg-white items-center">
            <div className="text-base h-10 w-full flex items-center justify-start hover:bg-slate-200">
              <h3 className="text-sm font-light pl-2">
                {componentEvent.projectComponent.assemblyGroup?.name}
              </h3>
            </div>
          </div>
          <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
            <div className="text-base h-10 w-full flex items-center justify-start hover:bg-slate-200">
              <h3 className="text-sm font-light pl-2">
                {componentEvent.projectComponent.name}
              </h3>
            </div>
          </div>
          <div className="group-hover:bg-slate-100 flex min-w-28 h-10 bg-white items-center">
            <div className="text-base h-10 w-full flex items-center justify-start hover:bg-slate-200">
              <h3 className="text-base font-medium pl-2">
                {componentEvent.addressIO?.byteAdress}.
                {componentEvent.addressIO?.bitAdress}
              </h3>
            </div>
          </div>
          <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
            <h3 className="text-sm font-light pl-2">{componentEvent.name}</h3>
          </div>
          <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
            <div className="text-base h-10 w-full flex items-center justify-start hover:bg-slate-200">
              <h3 className="text-sm font-light pl-2">
                {componentEvent.description}
              </h3>
            </div>
          </div>
        </div>
      )}
      {!newItem && (
        <Button
          onClick={() => {
            setNewItem(!newItem);
          }}
          variant="ghost"
          className="group rounded-none p-0 flex w-full h-10 bg-stone-200 hover:bg-stone-200 space-x-[1px]"
        >
          <div className="flex min-w-10 h-10 bg-white items-center group-hover:bg-slate-200">
            <div className="w-full h-full rounded-none p-0 flex items-center justify-center">
              <Plus strokeWidth={1} className="hidden group-hover:block" />
            </div>
          </div>
          <div className="group-hover:bg-slate-100 flex w-full h-10 bg-white items-center">
            <div className="text-base h-10 w-full flex items-center justify-start">
              <h3 className="text-sm font-light pl-2 select-none">
                New I/O Item
              </h3>
            </div>
          </div>
        </Button>
      )}
    </div>
  );
};
