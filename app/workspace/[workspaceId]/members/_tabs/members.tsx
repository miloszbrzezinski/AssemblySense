import { MemberItem } from "@/components/members/member-item";
import { MemberWithProfile, WokrspaceMemberWithData } from "@/types";
import { Department } from "@prisma/client";

interface MembersTabProps {
  profileId: string;
  members: WokrspaceMemberWithData[];
  departments: Department[];
}
export const MembersTab = ({
  profileId,
  members,
  departments,
}: MembersTabProps) => {
  return (
    <div className="space-y-[1px] shadow-lg bg-neutral-300">
      {members.map((member) => (
        <MemberItem
          key={member.id}
          profileId={profileId}
          member={member}
          departments={departments}
        />
      ))}
    </div>
  );
};
