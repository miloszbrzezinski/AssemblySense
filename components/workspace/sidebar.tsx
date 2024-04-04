"use client";
import { Separator } from "@/components/ui/separator";
import SidebarButton from "./sidebar-button";
import {
  Factory,
  Home,
  Library,
  LibraryBig,
  PencilRuler,
  Puzzle,
  Settings,
  Timer,
  Users,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center pb-14 bg-white dark:bg-zinc-900 dark:border-r-[0px] border-r-[1px] border-[#E3E5E8] w-14 justify-between">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center py-3 space-y-1">
          <SidebarButton buttonName="Home" path="home">
            <Home strokeWidth={1} />
          </SidebarButton>
          <SidebarButton buttonName="Working time" path="working-time">
            <Timer strokeWidth={1} />
          </SidebarButton>
          <Separator />
          <SidebarButton buttonName="Projects" path="projects">
            <PencilRuler strokeWidth={1} />
          </SidebarButton>
          <SidebarButton buttonName="Library" path="library">
            <LibraryBig strokeWidth={1} />
          </SidebarButton>
          <SidebarButton buttonName="Customers" path="customers">
            <Factory strokeWidth={1} />
          </SidebarButton>
          <Separator />
        </div>
        <div className="py-3 space-y-1"></div>
      </div>
      <div className="flex flex-col items-center py-2 space-y-1">
        <SidebarButton buttonName="Members" path="members">
          <Users strokeWidth={1} />
        </SidebarButton>
        <SidebarButton buttonName="Settings" path="settings">
          <Settings strokeWidth={1} />
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
