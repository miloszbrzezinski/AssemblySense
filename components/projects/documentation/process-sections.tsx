import { AssemblyProcess, EventType } from "@prisma/client";
import { SubChapterItem } from "./sub-chapter-item";
import { db } from "@/lib/db";
import { EnableFormula } from "../design/action-enables/table/enable-formula";

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

  const componentsEvents = await db.componentEvent.findMany({
    where: {
      projectComponent: {
        assemblyProcess: {
          id: processId,
        },
      },
    },
    include: {
      addressIO: true,
      projectComponent: {
        include: {
          component: true,
        },
      },
    },
  });

  const processName = `${process.processId} ${process.name}`;

  return (
    <SubChapterItem subChapterName={processName}>
      <div className="pl-5 mt-2">
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
      <div className="pl-5 mt-2">
        <h4 className="text-lg">I/O list</h4>
        <div className="pl-5">
          <table className="border-collapse relative w-full">
            <thead>
              <tr>
                <th className="border border-stone-800 font-medium">
                  Component
                </th>
                <th className="border border-stone-800 font-medium">
                  Component Symbol
                </th>
                <th className="border border-stone-800 font-medium">Event</th>
                <th className="border border-stone-800 font-medium">Adress</th>
                <th className="border border-stone-800 font-medium">Symbol</th>
                <th className="border border-stone-800 font-medium">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {componentsEvents.map((event) => (
                <tr key={event.id}>
                  <td className="border border-stone-800 pl-2">
                    {event.projectComponent.component.manufacturer}{" "}
                    {event.projectComponent.component.name}
                  </td>
                  <td className="border border-stone-800 pl-2">
                    {event.projectComponent.name}
                  </td>
                  <td className="border border-stone-800 pl-2">{event.name}</td>
                  <td className="border border-stone-800 pl-2">
                    {event.eventType == EventType.ACTION && "O"}
                    {event.eventType == EventType.STATUS && "I"}
                    {event.addressIO?.byteAdress}.{event.addressIO?.bitAdress}
                  </td>
                  <td className="border border-stone-800 pl-2">
                    {event.addressIO?.symbol}
                  </td>
                  <td className="border border-stone-800 pl-2">
                    {event.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pl-5 mt-2">
        <h4 className="text-lg">Action enables</h4>
        <div className="pl-5">
          <table className="border-collapse relative w-full">
            <thead>
              <tr>
                <th className="border border-stone-800 font-medium">Event</th>
                <th className="border border-stone-800 font-medium">Adress</th>
                <th className="border border-stone-800 font-medium">Enable</th>
                <th className="border border-stone-800 font-medium">Comment</th>
              </tr>
            </thead>
            <tbody>
              {componentsEvents.map(
                (event) =>
                  event.eventType === EventType.ACTION && (
                    <tr key={event.id}>
                      <td className="border border-stone-800 pl-2">
                        {event.name}
                      </td>
                      <td className="border border-stone-800 pl-2">
                        O{event.addressIO?.byteAdress}.
                        {event.addressIO?.bitAdress}
                      </td>
                      <td className="border border-stone-800 pl-2">
                        <EnableFormula
                          type="transparent"
                          formula={event.eventEnableFormula}
                        />
                      </td>
                      <td className="border border-stone-800 pl-2">
                        {event.eventEnableComment}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pl-5">
        <h4 className="text-lg">Sequences</h4>
      </div>
    </SubChapterItem>
  );
};
