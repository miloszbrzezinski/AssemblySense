"use client";
import { addProjectMember } from "@/actions/project-members";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MemberWithProfile, MemberWithProfileWithProjects } from "@/types";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

export const WorkspaceMemberItem = ({
  addingId,
  member,
  projectId,
}: {
  addingId: string;
  member: MemberWithProfileWithProjects;
  projectId: string;
}) => {
  const [isProjectMember, setIsProjectMember] = useState(false);
  const router = useRouter();

  useEffect(() => {
    member.projectMembers.forEach(
      (projectMember) =>
        projectMember.projectId === projectId && setIsProjectMember(true),
    );
  });

  const onClick = () => {
    startTransition(() => {
      addProjectMember(addingId, member, projectId).then((data) => {
        // setError(data.error);
        if (data.success) {
          router.refresh();
        }
      });
    });
  };

  return (
    <div
      key={member.id}
      className="flex w-full justify-between space-x-2 hover:bg-stone-200/60 rounded-none p-2 items-center"
    >
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={member.profile.imageUrl} />
        </Avatar>
        <div className="flex space-x-1 items-center">
          <p className="font-extralight text-lg">{member.profile.name}</p>
          <p className="font-light text-lg">{member.profile.lastName}</p>
        </div>
      </div>
      {isProjectMember ? (
        <p className="p-2">Added</p>
      ) : (
        <Button onClick={onClick} variant="outline">
          Add
        </Button>
      )}
    </div>
  );
};
