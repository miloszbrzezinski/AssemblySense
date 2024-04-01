import { Logo } from "@/components/logo";
import { CreateWorkspaceForm } from "@/components/workspace/create-workspace-form";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { currentUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const WorkspacePage = async () => {
  const profile = await initialProfile();

  const workspace = await db.workspace.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (workspace) {
    return redirect(`/workspace/${workspace.id}/home`);
  }

  return (
    <div className="h-full">
      <main className="h-full bg-gradient-to-tl from-sky-800 to-amber-900 backdrop-blur-3xl flex flex-row">
        <div className="w-[50%] p-5 space-y-5 flex flex-col items-start justify-center">
          <Logo className="from-white to-white text-7xl hover:opacity-100" />
          <p className="text-5xl font-thin text-white">
            create your first workspace
          </p>
        </div>
        <div className="w-[50%] bg-white justify-center items-center flex">
          <CreateWorkspaceForm userId={profile.id} />
        </div>
      </main>
    </div>
  );
};

export default WorkspacePage;
