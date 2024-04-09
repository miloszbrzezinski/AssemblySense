import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UseCaseProject } from "@/components/library/use-case-project-item";

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
      projects: {
        include: {
          projectComponents: {
            where: {
              componentId: params.componentId,
            },
            include: {
              assemblyGroup: true,
              assemblyProcess: true,
              component: true,
            },
          },
        },
      },
      componentCategories: {
        include: {
          components: {
            where: {
              id: params.componentId,
            },
            include: {
              projectComponents: {
                include: {
                  project: true,
                  assemblyGroup: true,
                  assemblyProcess: true,
                  componentEvents: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!workspace) {
    return;
  }

  const tmpComponent = workspace.componentCategories.filter(
    (category) => category.components.length > 0,
  );

  if (!tmpComponent[0]) {
    return <p className="p-5">Component not found!</p>;
  }

  const component = tmpComponent[0].components[0];

  const projects = workspace.projects;

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
        <TabsContent value="use_cases">
          <div className="flex flex-col space-y-[1px]">
            {projects.map(
              (project) =>
                project.projectComponents.length > 0 && (
                  <UseCaseProject key={project.id} project={project} />
                ),
            )}
          </div>
        </TabsContent>
        <TabsContent value="problems"></TabsContent>
      </Tabs>
    </div>
  );
}
