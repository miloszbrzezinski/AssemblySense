"use client";

import { WorkingHours } from "@prisma/client";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface HoursInputProps {
  profileId: string;
  workspaceId: string;
  workingHours: WorkingHours;
}

export const HoursInput = ({
  profileId,
  workspaceId,
  workingHours,
}: HoursInputProps) => {
  const [time, setTime] = useState(0.0);

  useEffect(() => {
    if (workingHours) {
      setTime(workingHours.value);
    }
  }, [workingHours]);

  const addTime = () => {
    time < 24 && setTime((t) => (t += 0.5));
  };

  const removeTime = () => {
    time > 0 && setTime((t) => (t -= 0.5));
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
