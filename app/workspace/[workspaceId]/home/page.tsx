import HelloWidget from "@/components/workspace/hello-widget";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await currentProfile();

  if (!profile) return redirect("/");

  return (
    <div className="h-full w-full p-5 flex">
      <HelloWidget name={profile.name} />
    </div>
  );
}
