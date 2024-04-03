"use client";
import { cn } from "@/lib/utils";
import { MemberWithProfile } from "@/types";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Check,
  Gavel,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { Department, MemberRole } from "@prisma/client";

export const MemberItem = ({
  member,
  departments,
}: {
  member: MemberWithProfile;
  departments: Department[];
}) => {
  const router = useRouter();
  const { onOpen } = useModal();
  const onClick = () => {
    router.push(`projects/${member.id}/dashboard`);
  };

  const onRoleChange = async (memberId: string, role: MemberRole) => {};

  const onDepartmentChange = async (
    memberId: string,
    department: Department | null,
  ) => {};

  return (
    <div
      onClick={onClick}
      className="group bg-white h-16 items-center justify-between flex p-5 hover:bg-slate-50 dark:bg-neutral-900 dark:hover:bg-neutral-900/80 select-none"
    >
      <div className="flex items-center space-x-5">
        <Avatar>
          <AvatarImage src={member.profile.imageUrl} />
        </Avatar>
        <div>
          <p className="text-xl space-x-2">
            <span className="font-light">{member.profile.name}</span>
          </p>
          <p className="font-extralight">{member.profile.email}</p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <MoreVertical className="h-6 w-6 text-zinc-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left">
            {member.role !== "ADMIN" && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center">
                  <ShieldQuestion className="w-4 h-4 mr-2" />
                  <span>Role</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() => onRoleChange(member.id, "GUEST")}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Guest
                      {member.role === "GUEST" && (
                        <Check className="h-4 w-4 ml-auto" />
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRoleChange(member.id, "MODERATOR")}
                    >
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      Moderator
                      {member.role === "MODERATOR" && (
                        <Check className="h-4 w-4 ml-auto" />
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            )}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center">
                <span>Department</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => onDepartmentChange(member.id, null)}
                  >
                    None
                    <p>{member.department?.id}</p>
                    {!member.departmentId && (
                      <Check className="h-4 w-4 ml-auto" />
                    )}
                  </DropdownMenuItem>
                  {departments.map((department) => (
                    <DropdownMenuItem
                      key={department.id}
                      onClick={() => onDepartmentChange(member.id, department)}
                    >
                      {department.name}
                      {member.departmentId === department.id && (
                        <Check className="h-4 w-4 ml-auto" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {member.role !== "ADMIN" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    onOpen("removeWorkspaceMember", {
                      workspaceMember: member,
                    });
                  }}
                >
                  <Gavel className="h-4 w-4 mr-2 text-red-500" />
                  <span className="text-red-500">Kick</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
