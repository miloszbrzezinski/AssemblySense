import { ProjectComponentWithData } from "@/types";

interface ProjectComponentNavbarProps {
  projectComponent: ProjectComponentWithData;
}

export const ProjectComponentNavbar = ({
  projectComponent,
}: ProjectComponentNavbarProps) => {
  return (
    <div className="border-b text-xl font-light items-center p-2 bg-white shadow-md">
      <p className="space-x-1">
        <button className="hover:bg-stone-100 px-1 rounded-md">
          Project components
        </button>
        <span>/</span>
        <span>{projectComponent.name}</span>
      </p>
    </div>
  );
};
