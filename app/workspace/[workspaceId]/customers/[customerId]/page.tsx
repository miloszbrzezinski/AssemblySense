import ProjectItem from "@/components/customers/project-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export default async function NewCustomersPage({
  params,
}: {
  params: { workspaceId: string; customerId: string };
}) {
  const profile = await currentProfile();

  if (!profile) {
    return;
  }

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
      customers: {
        where: {
          id: params.customerId,
        },
        include: {
          projects: true,
        },
      },
    },
  });

  const customer = workspace?.customers[0];

  if (!customer) {
    return;
  }

  return (
    <div className="h-full w-full flex flex-col">
      <SpaceNavbar spaceName={`Customer ${customer?.name}`}></SpaceNavbar>
      <div className="h-full w-full flex flex-col p-2">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          <TabsContent value="overview"></TabsContent>
          <TabsContent value="projects" className="p-2">
            {customer?.projects.length === 0 && (
              <p className="text-4xl font-light text-stone-500">No projects</p>
            )}
            <div className="space-y-[1px] overflow-y-scroll shadow-lg bg-neutral-300">
              {customer?.projects.length > 0 &&
                customer?.projects.map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="events"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
