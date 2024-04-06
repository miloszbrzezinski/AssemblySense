"use client";
import { ProjectComponentWithData } from "@/types";
import { FormEvent, useEffect, useState } from "react";

interface ProjectComponentItemProps {
  projectComponent: ProjectComponentWithData;
}

export const ProjectComponentItem = ({
  projectComponent,
}: ProjectComponentItemProps) => {
  const [componentName, setComponentName] = useState("");

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setComponentName(event.currentTarget.value);
    // setSearchInput(nameInput);
  };

  useEffect(() => {
    setComponentName(projectComponent.name);
  }, [projectComponent]);

  return (
    <>
      <input
        onChange={handleInput}
        value={componentName}
        className="group-hover:bg-slate-100 w-full h-10 text-base font-light focus:outline-none focus:bg-slate-200 focus:rounded-none pl-2"
      />
    </>
  );
};
