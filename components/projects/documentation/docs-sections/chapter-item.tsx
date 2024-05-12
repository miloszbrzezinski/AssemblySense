"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

interface ChapterItemProps {
  chapterNo: number;
  chapterName: string;
  children: React.ReactNode;
}

export const ChapterItem = ({
  chapterNo,
  chapterName,
  children,
}: ChapterItemProps) => {
  const searchParams = useSearchParams();
  const chapter = searchParams.get("chapter");
  const selected = chapter && chapter === chapterName;

  return (
    <div className={cn("py-5", selected && "bg-white/40 shadow-lg")}>
      <h2 className="text-2xl">
        {chapterNo}. {chapterName}
      </h2>
      <div className="pl-5 mt-2">{children}</div>
    </div>
  );
};
