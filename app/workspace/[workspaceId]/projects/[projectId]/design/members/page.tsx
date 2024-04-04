import { AssetMembersSidebar } from "@/components/projects/asset-members-sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberWithProfile } from "@/types";
import { Crown, X } from "lucide-react";

export default async function ProjectDesignNetworkPage({
  params,
}: {
  params: {
    workspaceId: string;
    projectId: string;
  };
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
      members: {
        include: {
          profile: true,
        },
      },
      departments: {
        include: {
          members: {
            include: {
              profile: true,
            },
          },
        },
      },
    },
  });

  if (!workspace) {
    return;
  }

  const otherMembers = workspace.members.filter((m) => !m.departmentId);

  return (
    <div className="h-full w-full flex">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel className="min-w-[50%] h-full" defaultSize={85}>
          <div className="border-b text-xl items-center p-2 bg-white shadow-md">
            <p>Project members</p>
          </div>
          {workspace.departments.map((department) => (
            <Accordion key={department.id} type="multiple">
              <AccordionItem value="project">
                <div className="flex items-center justify-between pr-3 w-full shadow-sm shadow-stone-300">
                  <AccordionTrigger className="">
                    <p className="text-lg pl-1 font-normal">
                      {department.name}
                    </p>
                  </AccordionTrigger>
                  <p className="text-lg pl-1 font-light">
                    {department.members.length}
                  </p>
                </div>
                <AccordionContent className="pb-0">
                  {department.members.map((member) => (
                    <p key={member.id}></p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
          <Accordion type="multiple">
            <AccordionItem value="project">
              <div className="flex items-center justify-between pr-3 w-full shadow-sm shadow-stone-300">
                <AccordionTrigger className="">
                  <p className="text-lg pl-1 font-normal">Other</p>
                </AccordionTrigger>
                <p className="text-lg pl-1 font-light">{otherMembers.length}</p>
              </div>
              <AccordionContent className="pb-0">
                {otherMembers.map((member) => (
                  <MemberItem key={member.id} member={member} />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ResizablePanel>
        <ResizableHandle className="shadow-lg shadow-black bg-stone-300" />
        <ResizablePanel className="min-w-72 h-full" defaultSize={15}>
          <AssetMembersSidebar
            departments={workspace.departments}
            members={workspace.members}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

const MemberItem = ({ member }: { member: MemberWithProfile }) => {
  return (
    <div
      key={member.id}
      className="flex w-full space-x-[1px] bg-stone-400/70 items-center"
    >
      <div className="min-w-14 min-h-14 bg-stone-200 flex">
        <Button
          variant="ghost"
          className="h-14 rounded-none hover:bg-stone-300"
        >
          <Crown strokeWidth={1} />
        </Button>
      </div>
      <div className="flex w-full min-h-14 bg-stone-200 items-center p-2 space-x-2">
        <Avatar>
          <AvatarImage src={member.profile.imageUrl} />
        </Avatar>
        <p className="font-light text-lg">{member.profile.name}</p>
      </div>
      <div className="w-14 min-h-14 bg-stone-200 flex">
        <Button variant="destructive" className="h-14 rounded-none">
          <X />
        </Button>
      </div>
    </div>
  );
};
