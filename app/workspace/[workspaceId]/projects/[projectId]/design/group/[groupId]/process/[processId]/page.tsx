import { EnableFormulaPopover } from "@/components/projects/design/action-enables/table/enable-formula-popover";
import { ProcessDescription } from "@/components/projects/design/group/process/process-description";
import { TabsListItem } from "@/components/projects/design/group/process/tab-list";
import { TitleBar } from "@/components/projects/design/group/process/title-bar";
import { ProcessSequence } from "@/components/projects/design/sequence/sequence";
import { StepItem } from "@/components/projects/design/sequence/step-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ComponentEvent } from "@prisma/client";
import { Circle, Plus } from "lucide-react";
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
    include: {
      projects: {
        where: {
          id: params.projectId,
        },
        include: {
          assemblyGroups: {
            where: {
              id: params.groupId,
            },
            include: {
              assemblyProcesses: {
                where: {
                  id: params.processId,
                },
                include: {
                  projectComponents: {
                    include: {
                      componentEvents: true,
                    },
                  },
                  sequences: {
                    include: {
                      sequenceStep: {
                        include: {
                          componentsEvents: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!workspace) {
    return <p className="p-5">Workspace not found!</p>;
  }

  const project = workspace.projects[0];

  if (!project) {
    return <p className="p-5">Project not found!</p>;
  }

  const group = project.assemblyGroups[0];

  if (!group) {
    return <p className="p-5">Group not found!</p>;
  }

  const process = group.assemblyProcesses[0];

  if (!process) {
    return <p className="p-5">Process not found!</p>;
  }

  const sequences = process.sequences;
  let componentEvents: ComponentEvent[] = [];

  process.projectComponents.forEach(
    (comp) => (componentEvents = [...componentEvents, ...comp.componentEvents])
  );

  return (
    <div className="h-full w-full flex flex-col p-4 space-y-4 overflow-y-scroll">
      <TitleBar
        profileId={profile.id}
        workspaceId={params.workspaceId}
        projectId={params.projectId}
        groupId={params.groupId}
        process={process}
      />
      <Tabs defaultValue="overview">
        <TabsListItem
          profileId={profile.id}
          workspaceId={params.workspaceId}
          projectId={params.projectId}
          groupId={params.groupId}
          processId={params.processId}
          sequences={sequences}
        />
        <TabsContent
          value="overview"
          className="w-full justify-center items-center flex overflow-y-scroll"
        >
          <div className="flex flex-col w-full h-96">
            <p className="text-xl my-5">Process description</p>
            <ProcessDescription
              profileId={profile.id}
              workspaceId={params.workspaceId}
              projectId={params.projectId}
              process={process}
            />
          </div>
        </TabsContent>
        {sequences.map((seq) => (
          <TabsContent value={seq.id} key={seq.id}>
            <ProcessSequence
              profileId={profile.id}
              workspaceId={params.workspaceId}
              projectId={params.projectId}
              groupId={params.groupId}
              processId={params.processId}
              sequence={seq}
              componentEvents={componentEvents}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
