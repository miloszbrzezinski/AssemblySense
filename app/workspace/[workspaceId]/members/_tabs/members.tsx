import { MemberItem } from "@/components/members/member-item";
import { MemberWithProfile } from "@/types";
import { Department } from "@prisma/client";

interface MembersTabProps {
  members: MemberWithProfile[];
  departments: Department[];
}
export const MembersTab = ({ members, departments }: MembersTabProps) => {
  return (
    <div className="space-y-[1px] shadow-lg bg-neutral-300">
      {members.map((member) => (
        <MemberItem key={member.id} member={member} departments={departments} />
      ))}
    </div>
  );
};
