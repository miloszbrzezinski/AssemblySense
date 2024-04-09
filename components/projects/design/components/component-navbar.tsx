import { ProjectComponentWithData } from "@/types";

interface ProjectComponentNavbarProps {
  projectComponent: ProjectComponentWithData;
}

export const ProjectComponentNavbar = ({
  projectComponent,
}: ProjectComponentNavbarProps) => {
  return (
    <div className="flex border-b text-xl font-light items-center p-2 bg-white shadow-md">
      <div className="flex space-x-1">
        <button className="hover:bg-stone-100 px-1 rounded-md">
          Project components
        </button>
        <span>/</span>
        <div className="flex space-x-2">
          <div className="space-x-1">
            <span className="font-extralight">
              {projectComponent.component.manufacturer}
            </span>
            <span className="font-extralight">
              {projectComponent.component.name}:
            </span>
          </div>
          <span>{projectComponent.name}</span>
        </div>
      </div>
    </div>
  );
};
