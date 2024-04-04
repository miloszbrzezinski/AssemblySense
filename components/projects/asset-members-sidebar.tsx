"use client";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { DepartmentWithMembers, MemberWithProfile } from "@/types";
import { Avatar, AvatarImage } from "../ui/avatar";

interface AssetMembersSidebarProps {
  departments: DepartmentWithMembers[];
  members: MemberWithProfile[];
}

export const AssetMembersSidebar = ({
  departments,
  members,
}: AssetMembersSidebarProps) => {
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModal();

  const otherMembers = members.filter((m) => !m.departmentId);

  return (
    <div className="w-full h-full border-r pb-20 border-stone-300 shadow-md overflow-scroll bg-stone-50">
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
                <MemberItem key={member.id} member={member} />
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
    </div>
  );
};

const MemberItem = ({ member }: { member: MemberWithProfile }) => {
  return (
    <div
      key={member.id}
      className="flex w-full justify-between space-x-2 hover:bg-stone-200/60 rounded-none p-2 items-center"
    >
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={member.profile.imageUrl} />
        </Avatar>
        <p className="font-light text-lg">{member.profile.name}</p>
      </div>
      <Button variant="outline">Add</Button>
    </div>
  );
};
