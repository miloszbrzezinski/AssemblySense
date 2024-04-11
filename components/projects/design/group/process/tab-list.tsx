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
        processId,
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
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      {sequences.map((seq) => (
        <TabsTrigger key={seq.id} value={seq.id}>
          {seq.name}
        </TabsTrigger>
      ))}
      <button
        onClick={onAdd}
        className="mx-2 h-min inline-flex items-center justify-center whitespace-nowrap text-white bg-stone-500  hover:shadow-md hover:shadow-stone-300 border border-stone-300 rounded-sm px-3 py-1 text-sm font-medium ring-offset-background transition-all"
      >
        <Plus strokeWidth={1} />
        Add sequence
      </button>
    </TabsList>
  );
};
