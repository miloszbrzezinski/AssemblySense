import { Navbar } from "@/components/workspace/navbar";
import { Sidebar } from "@/components/workspace/sidebar";
import { SidebarMobile } from "@/components/workspace/sidebar-mobile";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ThemeProvider } from "next-themes";
import { redirect } from "next/navigation";

export default async function WorkspaceLayout({
  params,
  children,
}: {
  params: {
    workspaceId: string;
  };
  children: React.ReactNode;
}) {
  const profile = await currentProfile();

  if (!profile) return redirect("/");

  const workspace = await db.workspace.findFirst({
    where: {
      id: params.workspaceId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!workspace) {
    return redirect("/");
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <div className="h-full bg-stone-100 dark:bg-neutral-900">
        <Navbar activeWorkspace={workspace} />
        <div className="pt-14 h-full flex">
          <div className="hidden md:flex h-full w-16 z-40 fixed">
            <Sidebar />
          </div>
          <div className="w-full md:pl-14 transition-all">{children}</div>
          <div className="md:hidden flex h-16 w-full z-40 fixed bottom-0">
            <SidebarMobile />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
