import HelloWidget from "@/components/workspace/hello-widget";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import Image from "next/image";

export default function CustomersPage() {
  return (
    <div className="h-full w-full flex">
      <SpaceNavbar spaceName="Customers"></SpaceNavbar>
    </div>
  );
}
