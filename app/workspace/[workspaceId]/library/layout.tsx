import { LibrarySidebar } from "@/components/library/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SpaceNavbar } from "@/components/workspace/space-navbar";

export default async function ProjectDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full bg-stone-100 dark:bg-zinc-800">
      <div className="absolute z-20 w-full left-0 md:pl-14 transition-all">
        <SpaceNavbar spaceName="Library" />
      </div>
      <div className="h-full flex pt-16">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="min-w-72 h-full" defaultSize={15}>
            <LibrarySidebar />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="min-w-[50%]" defaultSize={85}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
