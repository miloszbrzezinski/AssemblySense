"use client";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { Calendar } from "./calendar";

interface DesignSidebarProps {}

export const WorkingHoursSidebar = ({}: DesignSidebarProps) => {
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModal();

  const [newGroup, setNewGroup] = useState(false);

  const hideNewGroup = () => {
    setNewGroup(false);
  };

  return (
    <div className="flex px-2 h-full border-r pb-20 border-stone-300 shadow-md">
      <Calendar />
    </div>
  );
};
