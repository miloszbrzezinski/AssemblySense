"use client";
import { ProjectComponentWithData } from "@/types";

interface ProjectComponentUseCaseProps {
  projectComponent: ProjectComponentWithData;
}

export const ProjectComponentUseCase = ({
  projectComponent,
}: ProjectComponentUseCaseProps) => {
  return (
    <div className="group flex w-full h-10 bg-stone-300 space-x-[1px]">
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-stone-50  items-center">
        <h3 className="text-base font-light pl-2">
          {projectComponent.assemblyGroup?.name}
        </h3>
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-stone-50 items-center">
        <h3 className="text-base font-light pl-2">
          {projectComponent.assemblyProcess?.name}
        </h3>
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-stone-50  items-center">
        <h3 className="text-base font-light pl-2">{projectComponent.name}</h3>
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-stone-50  items-center">
        <h3 className="text-base font-light pl-2">
          {projectComponent.component.manufacturer}{" "}
          <span className="font-extralight">
            {projectComponent.component.name}
          </span>
        </h3>
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-stone-50  items-center">
        <h3 className="text-base font-light pl-2">{projectComponent.status}</h3>
      </div>
      <div className="group-hover:bg-slate-100 flex w-full h-10 bg-stone-50  items-center">
        <h3 className="text-base font-light pl-2">
          {projectComponent.description}
        </h3>
      </div>
    </div>
  );
};
