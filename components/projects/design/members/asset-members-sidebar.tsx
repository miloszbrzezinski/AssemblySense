"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";
import {
  DepartmentWithMembers,
  DepartmentWithMembersWithProjects,
  MemberWithProfile,
  MemberWithProfileWithProjects,
} from "@/types";
import { WorkspaceMemberItem } from "./workspace-member-item";

interface AssetMembersSidebarProps {
  profileId: string;
  departments: DepartmentWithMembersWithProjects[];
  members: MemberWithProfileWithProjects[];
  projectId: string;
}

export const AssetMembersSidebar = ({
  profileId,
  departments,
  members,
  projectId,
}: AssetMembersSidebarProps) => {
  const otherMembers = members.filter((m) => !m.departmentId);

  return (
    <div className="w-full h-full border-r pb-20 border-stone-300 shadow-md overflow-scroll ">
      <div className="border-b text-xl items-center p-2 bg-white shadow-md">
        <p>Workspace members</p>
      </div>
      {departments.map((department) => (
        <Accordion key={department.id} type="multiple">
          <AccordionItem value="project">
            <div className="flex items-center justify-between pr-3 w-full shadow-sm shadow-stone-300">
              <AccordionTrigger className="">
                <p className="text-lg pl-1 font-normal">{department.name}</p>
              </AccordionTrigger>
              <p className="text-lg pl-1 font-light">
                {department.members.length}
              </p>
            </div>
            <AccordionContent className="pb-0">
              {department.members.map((member) => (
                <WorkspaceMemberItem
                  key={member.id}
                  addingId={profileId}
                  projectId={projectId}
                  member={member}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
      <Accordion type="multiple">
        <AccordionItem value="project">
          <div className="flex items-center justify-between pr-3 w-full shadow-sm shadow-stone-300">
            <AccordionTrigger className="">
              <p className="text-lg pl-1 font-normal">No department</p>
            </AccordionTrigger>
            <p className="text-lg pl-1 font-light">{otherMembers.length}</p>
          </div>
          <AccordionContent className="pb-0">
            {otherMembers.map((member) => (
              <WorkspaceMemberItem
                key={member.id}
                addingId={profileId}
                projectId={projectId}
                member={member}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
