import {
  AssemblyProcess,
  Department,
  EventType,
  ProjectNetwork,
} from "@prisma/client";
import { SubChapterItem } from "../docs-sections/sub-chapter-item";
import { db } from "@/lib/db";
import { EnableFormula } from "../../design/action-enables/table/enable-formula";
import { ConnectionTableCell } from "../connection-table-cell";
import { ProcessSequenceDocs } from "../sequence/sequence";
import { SectionItem } from "../docs-sections/section-item";
import { SubSectionItem } from "../docs-sections/sub-section-item";
import { ChapterItem } from "../docs-sections/chapter-item";
import { DepartmentWithMembersWithProjects } from "@/types";
import { profile } from "console";
import { cn } from "@/lib/utils";

interface NetworkChapterProps {
  chapterNo: number;
  projectId: string;
}

export const NetworkChapter = async ({
  chapterNo,
  projectId,
}: NetworkChapterProps) => {
  const networks = await db.projectNetwork.findMany({
    where: {
      projectId,
    },
    include: {
      componentConnections: {
        include: {
          projectNetwork: true,
          projectComponent: {
            include: {
              component: true,
              assemblyGroup: true,
            },
          },
        },
      },
    },
  });

  return (
    <ChapterItem chapterNo={chapterNo} chapterName="Networks">
      {networks.map((network, i) => (
        <SubChapterItem
          key={network.id}
          chapterNo={chapterNo}
          subChapterNo={i + 1}
          subChapterName={network.name}
        >
          <>
            <SectionItem
              chapterNo={chapterNo}
              subCharterNo={i + 1}
              sectionNo={1}
              sectionName="Overview"
            >
              <p>{network.description}</p>
              <table className="border-collapse relative mt-3">
                <tbody>
                  <tr>
                    <td className="border border-stone-800 font-medium px-5">
                      Subnet mask
                    </td>
                    <td className="border border-stone-800 pl-2 px-10">
                      {network.subnetMask}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-stone-800 font-medium px-5">
                      Network portion
                    </td>
                    <td className="border border-stone-800 pl-2 px-10">
                      {network.networkPortion}
                    </td>
                  </tr>
                </tbody>
              </table>
            </SectionItem>
            <SectionItem
              chapterNo={chapterNo}
              subCharterNo={i + 1}
              sectionNo={2}
              sectionName="Team members addresses"
            >
              <table className="border-collapse relative">
                <thead>
                  <tr>
                    <th className="border border-stone-800 font-medium px-5">
                      Member
                    </th>
                    <th className="border border-stone-800 font-medium px-5">
                      Address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {network.componentConnections.map((connection) => (
                    <tr key={connection.id}>
                      <td className="border border-stone-800 pl-2 px-10">
                        {connection.hostPortion}
                      </td>
                      <td className="border border-stone-800 pl-2 px-10">
                        {connection.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SectionItem>
            <SectionItem
              chapterNo={chapterNo}
              subCharterNo={i + 1}
              sectionNo={3}
              sectionName="Connections"
            >
              <table className="border-collapse relative w-full">
                <thead>
                  <tr>
                    <th className="border border-stone-800 font-medium">
                      Component
                    </th>
                    <th className="border border-stone-800 font-medium">
                      Component symbol
                    </th>
                    <th className="border border-stone-800 font-medium">
                      Control group
                    </th>
                    <th className="border border-stone-800 font-medium">
                      Address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {network.componentConnections.map((connection) => (
                    <tr key={connection.id}>
                      <td className="border border-stone-800 pl-2">
                        {connection.projectComponent.component.manufacturer}{" "}
                        {connection.projectComponent.component.name}
                      </td>
                      <td className="border border-stone-800 pl-2">
                        {connection.projectComponent.name}
                      </td>
                      <td className="border border-stone-800 pl-2">
                        {connection.projectComponent.assemblyGroup?.name}
                      </td>
                      <td className="border border-stone-800 pl-2">
                        {connection.projectNetwork.networkPortion}.
                        {connection.hostPortion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SectionItem>
          </>
        </SubChapterItem>
      ))}
    </ChapterItem>
  );
};
