import HelloWidget from "@/components/workspace/hello-widget";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import Image from "next/image";

export default function WorkspaceMembersPage() {
  return (
    <div className="h-full w-full flex">
      <SpaceNavbar spaceName="Workspace members"></SpaceNavbar>
    </div>
  );
}
