import { cn } from "@/lib/utils";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Hint } from "../hint";

interface SidebarButtonProps {
  buttonName: string;
  path: String;
  children: React.ReactNode;
}

path: String;
const SidebarButton = ({ buttonName, path, children }: SidebarButtonProps) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    router.push(`/workspace/${params.workspaceId}/${path}`);
  };

  return (
    <Hint description={buttonName} side="right">
      <div
        onClick={onClick}
        className={cn(
          "px-2 py-2 rounded-md flex items-center justify-center gap-x-2 w-full hover:bg-stone-700/10 dark:hover:bg-stone-700/50 transition relative z-0",
          (!pathname.split("/")[3] && path === "/") ||
            (pathname.split("/")[3] === path &&
              "bg-stone-600/20 dark:bg-neutral-900 dark:border dark:border-neutral-500 shadow-lg")
        )}
      >
        {children}
      </div>
    </Hint>
  );
};

export default SidebarButton;
