import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProjectWithComponents } from "@/types";
import { ProjectComponentUseCase } from "./project-component-use-case-item";

interface UseCaseProjectProps {
  project: ProjectWithComponents;
}

export const UseCaseProject = ({ project }: UseCaseProjectProps) => {
  return (
    <Accordion key={project.id} type="multiple">
      <AccordionItem value="project">
        <div className="flex items-center justify-between pr-3 w-full shadow-sm">
          <AccordionTrigger className="">
            <p className="text-lg pl-1 font-normal">{project.name}</p>
          </AccordionTrigger>
          <p className="text-lg pl-1 font-light">
            {project.projectComponents.length}
          </p>
        </div>
        <AccordionContent className="pl-5 py-1">
          <div className="bg-stone-300 space-y-[1px]">
            {project.projectComponents.map((component) => (
              <ProjectComponentUseCase
                key={component.id}
                projectComponent={component}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
