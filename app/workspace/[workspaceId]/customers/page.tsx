import { CustomerItem } from "@/components/customers/customer-item";
import { Button } from "@/components/ui/button";
import HelloWidget from "@/components/workspace/hello-widget";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function CustomersPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const profile = await currentProfile();

  if (!profile) {
    return;
  }

  const workspace = await db.workspace.findUnique({
    where: {
      id: params.workspaceId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      customers: true,
    },
  });

  if (!workspace) {
    return;
  }

  return (
    <div className="h-full w-full flex flex-col">
      <SpaceNavbar spaceName="Customers">
        <Link href={`/workspace/${params.workspaceId}/customers/new`}>
          <Button className="space-x-2 px-3 bg-stone-500 text-stone-50">
            <Plus strokeWidth={1} />
            <p>Add customer</p>
          </Button>
        </Link>
      </SpaceNavbar>
      <div className="p-5 overflow-y-scroll">
        {workspace.customers.length === 0 && (
          <p className="text-4xl font-light text-stone-500">No customers</p>
        )}
        <div className="space-y-[1px] overflow-y-scroll shadow-lg bg-neutral-300">
          {workspace.customers.length > 0 &&
            workspace.customers.map((customer) => (
              <CustomerItem key={customer.id} customer={customer} />
            ))}
        </div>
      </div>
    </div>
  );
}
