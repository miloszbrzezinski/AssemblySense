import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ProjectMemberWithProfile } from "@/types";
import { Crown, X } from "lucide-react";

export const ProjectMemberItem = ({
  member,
}: {
  member: ProjectMemberWithProfile;
}) => {
  return (
    <div
      key={member.id}
      className="flex w-full space-x-[1px] bg-stone-400/70 items-center"
    >
      <div className="group min-w-14 min-h-14 bg-stone-200 flex">
        <Button
          variant="ghost"
          className="h-14 rounded-none hover:bg-stone-300"
        >
          <Crown strokeWidth={1} className="group-hover:text-amber-600" />
        </Button>
      </div>
      <div className="flex w-full min-h-14 bg-stone-200 items-center p-2 space-x-2 hover:bg-stone-300">
        <Avatar>
          <AvatarImage src={member.workspaceMember.profile.imageUrl} />
        </Avatar>
        <p className="font-light text-lg">
          {member.workspaceMember.profile.name}
        </p>
      </div>
      <div className="w-14 min-h-14 bg-stone-200 flex">
        <Button
          variant="ghost"
          className="group h-14 rounded-none hover:bg-red-900"
        >
          <X strokeWidth={1} className="group-hover:text-white" />
        </Button>
      </div>
    </div>
  );
};
