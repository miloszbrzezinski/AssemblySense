import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function ComponentsLibraryPage({
  params,
}: {
  params: { workspaceId: string; componentId: string };
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
    include: {
      componentCategories: {
        include: {
          components: {
            where: {
              id: params.componentId,
            },
          },
        },
      },
    },
  });

  if (!workspace) {
    return;
  }

  const component = workspace.componentCategories.filter(
    (category) => category.components.length > 0,
  )[0].components[0];

  return (
    <div className="h-full w-full flex flex-col p-4">
      <div className="pb-4 flex space-x-3">
        <p className="text-4xl font-light">{component.manufacturer}</p>
        <p className="text-4xl font-extralight">{component.name}</p>
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
