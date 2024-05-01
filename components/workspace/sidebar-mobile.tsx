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

export const SidebarMobile = () => {
  return (
    <div className="flex items-center justify-between px-3 w-full bg-white dark:bg-zinc-900 dark:border-t-[0px] border-t-[1px] border-[#E3E5E8] h-16">
          <SidebarButton buttonName="Home" path="home">
            <Home strokeWidth={1} />
          </SidebarButton>
          <SidebarButton buttonName="Working time" path="working-time">
            <Timer strokeWidth={1} />
          </SidebarButton>
          <SidebarButton buttonName="Projects" path="projects">
            <PencilRuler strokeWidth={1} />
          </SidebarButton>
          <SidebarButton buttonName="Library" path="library">
            <LibraryBig strokeWidth={1} />
          </SidebarButton>
          <SidebarButton buttonName="Customers" path="customers">
            <Factory strokeWidth={1} />
          </SidebarButton>
        <SidebarButton buttonName="Members" path="members">
          <Users strokeWidth={1} />
        </SidebarButton>
        <SidebarButton buttonName="Settings" path="settings">
          <Settings strokeWidth={1} />
        </SidebarButton>
    </div>
  );
};
