"use client";
import {
  removeProjectMember,
  setProjectMemberLeader,
} from "@/actions/project-members";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ProjectMemberWithProfile } from "@/types";
import { Crown, ShipWheel, X } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const ProjectMemberItem = ({
  userId,
  member,
}: {
  userId: string;
  member: ProjectMemberWithProfile;
}) => {
  const router = useRouter();
  const [leader, setLeader] = useState(false);

  useEffect(() => {
    setLeader(member.isLeader);
  }, [member.isLeader]);

  const onClickLeader = () => {
    startTransition(() => {
      setProjectMemberLeader(userId, member).then((data) => {
        // setError(data.error);
        if (data.success) {
          router.refresh();
        }
      });
    });
  };

  const onClickRemove = () => {
    startTransition(() => {
      removeProjectMember(userId, member).then((data) => {
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
      className="flex w-full space-x-[1px] bg-stone-400/70 items-center select-none"
    >
      <div className="group min-w-14 min-h-14 bg-stone-200 flex">
        <Button
          onClick={onClickLeader}
          variant="ghost"
          className={cn(
            "h-14 rounded-none hover:bg-stone-300 hover:text-slate-600",
            leader && "bg-slate-400/60 hover:bg-slate-400/70 hover:text-white",
          )}
        >
          <ShipWheel strokeWidth={1} className="" />
        </Button>
      </div>
      <div className="flex w-full min-h-14 bg-stone-200 items-center p-2 space-x-2 hover:bg-stone-300">
        <Avatar>
          <AvatarImage src={member.workspaceMember.profile.imageUrl} />
        </Avatar>
        <p className="font-extralight text-lg">
          {member.workspaceMember.profile.name}
        </p>
        <p className="font-light text-lg">
          {member.workspaceMember.profile.lastName}
        </p>
      </div>
      <div className="w-14 min-h-14 bg-stone-200 flex">
        <Button
          onClick={onClickRemove}
          variant="ghost"
          className="group h-14 rounded-none hover:bg-red-900"
        >
          <X strokeWidth={1} className="group-hover:text-white" />
        </Button>
      </div>
    </div>
  );
};
