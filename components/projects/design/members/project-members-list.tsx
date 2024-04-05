import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProjectMemberItem } from "./project-member-item";
import { Department } from "@prisma/client";
import { ProjectMemberWithProfile } from "@/types";

interface ProjectMembersListProps {
  userId: string;
  departments: Department[];
  projectMembers: ProjectMemberWithProfile[];
}

export const ProjectMembersList = ({
  userId,
  departments,
  projectMembers,
}: ProjectMembersListProps) => {
  const otherMembers = projectMembers.filter(
    (m) => !m.workspaceMember.departmentId,
  );
  return (
    <div>
      <div className="border-b text-xl items-center p-2 bg-white shadow-md">
        <p>Project members</p>
      </div>
      {departments.map((department) => (
        <Accordion key={department.id} type="multiple">
          <AccordionItem value="project">
            <div className="flex items-center justify-between pr-3 w-full shadow-sm shadow-stone-300">
              <AccordionTrigger className="">
                <p className="text-lg pl-1 font-normal">{department.name}</p>
              </AccordionTrigger>
              {/* <p className="text-lg pl-1 font-light">
                {department.members.length}
              </p> */}
            </div>
            <AccordionContent className="pb-0">
              {projectMembers.map(
                (member) =>
                  member.workspaceMember.departmentId === department.id && (
                    <ProjectMemberItem
                      key={member.id}
                      userId={userId}
                      member={member}
                    />
                  ),
              )}
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
            {/* <p className="text-lg pl-1 font-light">{otherMembers.length}</p> */}
          </div>
          <AccordionContent className="pb-0 space-y-[1px] bg-stone-400">
            {otherMembers.map((member) => (
              <ProjectMemberItem
                key={member.id}
                userId={userId}
                member={member}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
