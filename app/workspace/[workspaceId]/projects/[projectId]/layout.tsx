import ProjectNavbar from "@/components/projects/project-navbar";
import { Navbar } from "@/components/workspace/navbar";
import Sidebar from "@/components/workspace/sidebar";

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full bg-stone-100 dark:bg-zinc-800">
      <div className="absolute z-20 w-full left-0 md:pl-14 transition-all">
        <ProjectNavbar isFavourite={false} />
      </div>
      <div className="h-full flex pt-24">
        <div className="w-full transition-all bg-stone-100 dark:bg-zinc-800">
          {children}
        </div>
      </div>
    </div>
  );
}
