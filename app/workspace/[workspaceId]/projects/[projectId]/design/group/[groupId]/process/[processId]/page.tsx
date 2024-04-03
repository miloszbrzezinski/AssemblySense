import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function ProcessPage({
  params,
}: {
  params: {
    workspaceId: string;
    projectId: string;
    groupId: string;
    processId: string;
  };
}) {
  const profile = await currentProfile();

  if (!profile) return redirect("/");

  const workspace = await db.workspace.findUnique({
    where: {
      id: params.workspaceId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!workspace) {
    return <p className="p-5">Workspace not found!</p>;
  }

  const process = await db.assemblyProcess.findUnique({
    where: {
      id: params.processId,
    },
    include: {
      assemblyGroup: true,
    },
  });

  if (!process) {
    return <p className="p-5">Process not found!</p>;
  }

  return (
    <div className="h-full w-full flex flex-col p-4">
      <div className="pb-4 flex space-x-3">
        <p className="text-4xl font-light">{process.processId}</p>
        <p className="text-4xl font-extralight">{process.name}</p>
      </div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="use_cases">Use cases</TabsTrigger>
          <TabsTrigger value="problems">Problems</TabsTrigger>
        </TabsList>
        <TabsContent value="overview"></TabsContent>
        <TabsContent value="use_cases"></TabsContent>
        <TabsContent value="problems"></TabsContent>
      </Tabs>
    </div>
  );
}
