"use client";

import { Home, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface WorkspaceSearchProps {
  data: {
    label: string;
    type: "space" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export const WorkspaceSearch = ({ data }: WorkspaceSearchProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onClick = ({ id, type }: { id: string; type: "space" | "member" }) => {
    setOpen(false);

    // if (type === "member") {
    //   return router.push(`/servers/${params?.serverId}/conversations/${id}`)
    // }

    if (type === "space") {
      return router.push(`/spaces/${params?.serverId}/channels/${id}`);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group p-2 md:gap-4 border dark:border-neutral-500 rounded-md flex items-center md:w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
      >
        <Search className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        <kbd className="hidden pointer-events-none md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-base">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search or command" />
        <CommandList>
          <CommandEmpty>No Results found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      key={id}
                      onSelect={() => onClick({ id, type })}
                    >
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};
