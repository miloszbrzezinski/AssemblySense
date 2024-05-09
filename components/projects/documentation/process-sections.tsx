import { AssemblyProcess } from "@prisma/client";
import { SubChapterItem } from "./sub-chapter-item";
import { db } from "@/lib/db";

interface ProcessSectionProps {
  processId: string;
}

export const ProcessSection = async ({ processId }: ProcessSectionProps) => {
  const process = await db.assemblyProcess.findUnique({
    where: {
      id: processId,
    },
    include: {
      projectComponents: {
        include: {
          component: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  if (!process) {
    return <p>Process not found</p>;
  }

  const processName = `${process.processId} ${process.name}`;

  return (
    <SubChapterItem subChapterName={processName}>
      <div className="pl-5">
        <h4 className="text-lg">Components</h4>
        <div className="pl-5">
          <table className="border-collapse relative w-full">
            <thead>
              <tr>
                <th className="border border-stone-800 font-medium">Type</th>
                <th className="border border-stone-800 font-medium">
                  Manufacturer
                </th>
                <th className="border border-stone-800 font-medium">Model</th>
                <th className="border border-stone-800 font-medium">Symbol</th>
                <th className="border border-stone-800 font-medium">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {process.projectComponents.map((component) => (
                <tr key={component.id}>
                  <td className="border border-stone-800 pl-2">
                    {component.component.category.name}
                  </td>
                  <td className="border border-stone-800 pl-2">
                    {component.component.manufacturer}
                  </td>
                  <td className="border border-stone-800 pl-2">
                    {component.component.name}
                  </td>
                  <td className="border border-stone-800 pl-2">
                    {component.name}
                  </td>
                  <td className="border border-stone-800 pl-2">
                    {component.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pl-5">
        <h4 className="text-lg">I/O list</h4>
      </div>
      <div className="pl-5">
        <h4 className="text-lg">Action enables</h4>
      </div>
      <div className="pl-5">
        <h4 className="text-lg">Sequences</h4>
      </div>
    </SubChapterItem>
  );
};
