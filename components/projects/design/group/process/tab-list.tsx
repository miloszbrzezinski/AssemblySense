"use client";

import { addProcessSequence } from "@/actions/process-sequence";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SequenceWithSteps } from "@/types";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";

interface TabsListItemProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  groupId: string;
  processId: string;
  sequences: SequenceWithSteps[];
}

export const TabsListItem = ({
  profileId,
  workspaceId,
  projectId,
  groupId,
  processId,
  sequences,
}: TabsListItemProps) => {
  const router = useRouter();
  const onAdd = () => {
    startTransition(() => {
      addProcessSequence(
        profileId,
        workspaceId,
        projectId,
        groupId,
        processId
      ).then((data) => {
        // setError(data.error);
        if (data.success) {
          toast(data.success, {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          router.refresh();
        }
      });
    });
  };

  return (
    <div className="flex items-center justify-between bg-stone-200 dark:bg-neutral-800 shadow-md rounded-md space-x-1">
      <div className="flex overflow-x-scroll no-scrollbar">
        <TabsList className="bg-stone-200 dark:bg-neutral-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {sequences.map((seq) => (
            <TabsTrigger key={seq.id} value={seq.id}>
              {seq.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <button
        onClick={onAdd}
        className="flex space-x-1 px-2 bg-white border border-stone-300 shadow-md text-stone-900 h-full py-2 rounded-r-md whitespace-nowrap"
      >
        <Plus strokeWidth={1} />
        <p>Add sequence</p>
      </button>
    </div>
  );
};
