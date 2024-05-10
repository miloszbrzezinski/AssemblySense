import { ComponentConnectionWithNetwork } from "@/types";
import { ProjectNetwork } from "@prisma/client";

interface ConnectionTableCellProps {
  network: ProjectNetwork;
  connections: ComponentConnectionWithNetwork[];
}

export const ConnectionTableCell = ({
  network,
  connections,
}: ConnectionTableCellProps) => {
  let exist = false;
  let hostPortion = "";
  connections.forEach((c) => {
    if (c.projectNetworkId === network.id) {
      exist = true;
      hostPortion = c.hostPortion;
    }
  });
  const address = exist ? `${network.networkPortion}.${hostPortion}` : "-";
  return <td className="border border-stone-800 pl-2">{address}</td>;
};
