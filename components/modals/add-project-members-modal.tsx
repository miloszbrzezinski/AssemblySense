"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { ProjectMemberWithProfile, WokrspaceMemberWithData } from "@/types";

export const AddProjectMemberModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "addProjectMember";
  const { workspaceMembersWithData, projectId } = data;

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (!workspaceMembersWithData || !projectId) {
    return;
  }

  const onClick = async (memberId: string) => {};

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value.toLowerCase());
  };

  const filteredMembers = workspaceMembersWithData.filter(
    (member) =>
      member.profile.name.toLowerCase().includes(searchTerm) ||
      // member.workSpaceMember.profile.surname.toLowerCase().includes(searchTerm) ||
      member.department?.name.toLowerCase().includes(searchTerm),
  );

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-neutral-900 dark:text-gray-100 overflow-hidden">
        <DialogHeader className="p-0">
          <DialogTitle className="text-3xl font-light flex items-center space-x-2">
            Add project member
          </DialogTitle>
          <DialogDescription className="text-zinc-500 dark:text-neutral-400"></DialogDescription>
        </DialogHeader>
        <div className="flex border items-center rounded-md">
          <Search strokeWidth={1.5} className="mx-2" />
          <input
            onChange={onChange}
            className="w-full h-8 text-lg border-none bg-transparent outline-none"
          />
        </div>
        <div className="h-96 flex flex-col overflow-y-scroll">
          {filteredMembers ? (
            filteredMembers.map((member) => (
              <div
                key={member.id}
                className="group flex items-center justify-between w-full border-white dark:hover:bg-neutral-800/50 hover:bg-stone-50/50 p-2 pr-5 rounded-md"
              >
                <div className="flex items-center space-x-5">
                  <Avatar>
                    <AvatarImage src={member.profile.imageUrl} />
                  </Avatar>
                  <div className="select-none">
                    <div className="space-x-1">
                      <span className="font-light">{member.profile.name}</span>
                      {/* <span>{member.workSpaceMember.profile.surname}</span> */}
                    </div>
                    <div className="font-extralight text-sm">
                      {member.department ? (
                        member.department.name
                      ) : (
                        <p>No department</p>
                      )}
                    </div>
                  </div>
                </div>
                {member.ProjectMember.length > 0 ? (
                  <Button disabled={true} variant="outline">
                    Added
                  </Button>
                ) : (
                  <Button
                    disabled={isLoading}
                    onClick={() => onClick(member.id)}
                    variant="secondary"
                  >
                    Add
                  </Button>
                )}
              </div>
            ))
          ) : (
            <p>No members</p>
          )}
        </div>
        <DialogFooter className="py-4">
          <Button disabled={isLoading} variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const MemberItem = ({
  projectId,
  member,
}: {
  projectId: string;
  member: WokrspaceMemberWithData;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {};
  return (
    <div className="group flex items-center justify-between w-full border-white dark:hover:bg-neutral-800/50 hover:bg-stone-50/50 p-2 pr-5 rounded-md">
      <div className="flex items-center space-x-5">
        <Avatar>
          <AvatarImage src={member.profile.imageUrl} />
        </Avatar>
        <div className="select-none">
          <div className="space-x-1">
            <span className="font-light">{member.profile.name}</span>
            {/* <span>{member.workSpaceMember.profile.surname}</span> */}
          </div>
          <div className="font-extralight text-sm">
            {member.department ? member.department.name : <p>No department</p>}
          </div>
        </div>
      </div>
      {member.ProjectMember.length > 0 ? (
        <Button disabled={true} variant="outline">
          Added
        </Button>
      ) : (
        <Button disabled={isLoading} onClick={onClick} variant="secondary">
          Add
        </Button>
      )}
    </div>
  );
};
