import { ProjectMemberWithProfile } from "@/types";
import { Avatar, AvatarImage } from "../ui/avatar";

interface ProjectMemberItemProps {
  member: ProjectMemberWithProfile;
}

export const ProjectMemberItem = ({ member }: ProjectMemberItemProps) => {
  return (
    <div
      key={member.id}
      className="flex p-1 w-full bg-white space-x-[1px]  items-center select-none"
    >
      <div className="flex w-full min-h-14  items-center p-2 space-x-2 hover:bg-stone-100">
        <Avatar>
          <AvatarImage src={member.workspaceMember.profile.imageUrl} />
        </Avatar>
        <div>
          <div className="flex items-center space-x-1">
            <p className="font-extralight text-lg">
              {member.workspaceMember.profile.name}
            </p>
            <p className="font-light text-lg">
              {member.workspaceMember.profile.lastName}
            </p>
          </div>
          <p className="text-sm font-extralight text-stone-600">
            {member.workspaceMember.department
              ? member.workspaceMember.department.name
              : "No department"}
          </p>
        </div>
      </div>
    </div>
  );
};
