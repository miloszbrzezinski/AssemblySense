"use client";

import { setWorkingHoursTime } from "@/actions/working-hours";
import { WorkingHoursWithProjectMember } from "@/types";
import { WorkingHours } from "@prisma/client";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface HoursInputProps {
  profileId: string;
  workspaceId: string;
  workingHours: WorkingHoursWithProjectMember;
}

export const HoursInput = ({
  profileId,
  workspaceId,
  workingHours,
}: HoursInputProps) => {
  const [time, setTime] = useState(0.0);
  const router = useRouter();

  useEffect(() => {
    if (workingHours) {
      setTime(workingHours.value);
    }
  }, [workingHours]);

  const addTime = () => {
    time < 24 && setTime((t) => (t += 0.5));
    saveTime();
  };

  const removeTime = () => {
    time > 0 && setTime((t) => (t -= 0.5));
    saveTime();
  };

  const saveTime = async () => {
    startTransition(() => {
      setWorkingHoursTime(
        profileId,
        workspaceId,
        workingHours.projectMember.projectId,
        workingHours,
        time
      ).then((data) => {
        if (data.error) {
          toast(data.error, {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
        }
        if (data.success) {
          toast(data.success, {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          router.refresh();
        }
      });
    });
  };

  return (
    <div className="group flex w-full items-center">
      <button
        onClick={removeTime}
        className="hidden group-hover:flex min-w-10 h-10 items-center justify-center hover:bg-slate-200"
      >
        <Minus strokeWidth={1} />
      </button>
      <p className="w-full h-full text-xl font-light text-center">{time}h</p>
      <button
        onClick={addTime}
        className="hidden group-hover:flex min-w-10 h-10 items-center justify-center hover:bg-slate-200"
      >
        <Plus strokeWidth={1} />
      </button>
    </div>
  );
};
