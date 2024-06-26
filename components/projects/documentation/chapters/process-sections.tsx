import { EventType, ProjectNetwork } from "@prisma/client";
import { SubChapterItem } from "../docs-sections/sub-chapter-item";
import { db } from "@/lib/db";
import { EnableFormula } from "../../design/action-enables/table/enable-formula";
import { ConnectionTableCell } from "../connection-table-cell";
import { ProcessSequenceDocs } from "../sequence/sequence";
import { SectionItem } from "../docs-sections/section-item";
import { SubSectionItem } from "../docs-sections/sub-section-item";

interface ProcessSectionProps {
  chapterNo: number;
  subCharterNo: number;
  processId: string;
}

export const ProcessSection = async ({
  chapterNo,
  subCharterNo,
  processId,
}: ProcessSectionProps) => {
  const process = await db.assemblyProcess.findUnique({
    where: {
      id: processId,
    },
    include: {
      sequences: {
        include: {
          sequenceStep: {
            include: {
              componentsEvents: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      projectComponents: {
        include: {
          componentConnections: {
            include: {
              projectNetwork: true,
            },
          },
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

  const componentsConnections = await db.componentConnection.findMany({
    where: {
      projectComponent: {
        assemblyProcessId: processId,
      },
    },
    include: {
      projectNetwork: true,
    },
  });

  const networks = componentsConnections.map((c) => c.projectNetwork);

  const uniqueNetworks: ProjectNetwork[] = [];

  networks.forEach((n) => {
    let found = false;
    uniqueNetworks.forEach((i) => {
      if (n.id === i.id) found = true;
    });
    if (!found) {
      uniqueNetworks.push(n);
    }
  });

  const processName = `${process.processId} ${process.name}`;

  return (
    <SubChapterItem
      chapterNo={chapterNo}
      subChapterNo={subCharterNo}
      subChapterName={processName}
    >
      <SectionItem
        chapterNo={chapterNo}
        subCharterNo={subCharterNo}
        sectionNo={1}
        sectionName="Description"
      >
        <p>{process.description}</p>
      </SectionItem>
      <SectionItem
        chapterNo={chapterNo}
        subCharterNo={subCharterNo}
        sectionNo={2}
        sectionName="Components"
      >
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
      </SectionItem>
      <SectionItem
        chapterNo={chapterNo}
        subCharterNo={subCharterNo}
        sectionNo={3}
        sectionName="Connections"
      >
        <table className="border-collapse relative w-full">
          <thead>
            <tr>
              <th className="border border-stone-800 font-medium">Component</th>
              <th className="border border-stone-800 font-medium">Symbol</th>
              {uniqueNetworks.map((network) => (
                <th
                  key={network.id}
                  className="border border-stone-800 font-medium"
                >
                  {network.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {process.projectComponents.map((component) => (
              <tr key={component.id}>
                <td className="border border-stone-800 pl-2">
                  {component.component.manufacturer} {component.component.name}
                </td>
                <td className="border border-stone-800 pl-2">
                  {component.name}
                </td>
                {uniqueNetworks.map((network) => (
                  <ConnectionTableCell
                    key={network.id}
                    network={network}
                    connections={component.componentConnections}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </SectionItem>
      <SectionItem
        chapterNo={chapterNo}
        subCharterNo={subCharterNo}
        sectionNo={4}
        sectionName="I/O list"
      >
        <table className="border-collapse relative w-full">
          <thead>
            <tr>
              <th className="border border-stone-800 font-medium">Component</th>
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
      </SectionItem>
      <SectionItem
        chapterNo={chapterNo}
        subCharterNo={subCharterNo}
        sectionNo={5}
        sectionName="Action enables"
      >
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
      </SectionItem>
      <SectionItem
        chapterNo={chapterNo}
        subCharterNo={subCharterNo}
        sectionNo={6}
        sectionName="Sequences"
      >
        {process.sequences.map((seq, i) => (
          <SubSectionItem
            chapterNo={chapterNo}
            subCharterNo={subCharterNo}
            sectionNo={6}
            subSectionNo={i + 1}
            key={seq.id}
            subSectionName={seq.name}
          >
            <>
              <p>{seq.description}</p>
              <div>
                <ProcessSequenceDocs sequence={seq} />
              </div>
            </>
          </SubSectionItem>
        ))}
      </SectionItem>
    </SubChapterItem>
  );
};
