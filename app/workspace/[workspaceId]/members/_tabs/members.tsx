import { MemberItem } from "@/components/members/member-item";
import { MemberWithProfile } from "@/types";

interface MembersTabProps {
  members: MemberWithProfile[];
}
export const MembersTab = ({ members }: MembersTabProps) => {
  return (
    <div className="space-y-[1px] h-full overflow-y-scroll shadow-lg bg-neutral-300">
      {members.map((member) => (
        <MemberItem key={member.id} member={member} />
      ))}
    </div>
  );
};
