import { CreateCustomerForm } from "@/components/customers/create-customer-form";
import { CustomerItem } from "@/components/customers/customer-item";
import { Button } from "@/components/ui/button";
import HelloWidget from "@/components/workspace/hello-widget";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import { currentProfile } from "@/lib/current-profile";
import Image from "next/image";
import Link from "next/link";

export default async function NewCustomersPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const profile = await currentProfile();

  if (!profile) {
    return;
  }
  return (
    <div className="h-full w-full flex flex-col">
      <SpaceNavbar spaceName="Customers">
        <Link href={`/workspace/${params.workspaceId}/customers`}>
          <Button
            variant="destructive"
            className="space-x-2 px-3 bg-rose-700 text-stone-50"
          >
            <p>Cancel</p>
          </Button>
        </Link>
      </SpaceNavbar>
      <div className="p-5 overflow-y-scroll">
        <p className="text-4xl font-light text-stone-500 pb-5">New customer</p>
        <CreateCustomerForm
          userId={profile.id}
          workspaceId={params.workspaceId}
        />
      </div>
    </div>
  );
}
