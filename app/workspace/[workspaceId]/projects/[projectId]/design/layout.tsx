import { DesignSidebar } from "@/components/projects/design-sidebar";
import ProjectNavbar from "@/components/projects/project-navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Navbar } from "@/components/workspace/navbar";
import Sidebar from "@/components/workspace/sidebar";

export default async function ProjectDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex bg-stone-100 dark:bg-zinc-800">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="min-w-72 h-full" defaultSize={15}>
          <DesignSidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="min-w-[50%]" defaultSize={85}>
          <div className="w-full transition-all bg-stone-100 dark:bg-zinc-800">
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
