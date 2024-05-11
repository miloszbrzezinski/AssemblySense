"use client";
import { Bookmark } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/catalog-accordion";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

interface ChapterSidebarItemProps {
  chapterNo: number;
  chapterName: string;
  children?: React.ReactNode;
}

export const ChapterSidebarItem = ({
  chapterNo,
  chapterName,
  children,
}: ChapterSidebarItemProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`?chapter=${chapterName}`);
  };
  return (
    <Accordion type="multiple" className="group">
      <AccordionItem value="group">
        <div className="flex w-full justify-between items-center pr-2">
          <AccordionTrigger
            onClick={onClick}
            className="justify-start items-center space-x-1"
          >
            <Bookmark strokeWidth={1} className="min-w-6 h-6" />
            <p>
              {chapterNo}. {chapterName}
            </p>
          </AccordionTrigger>
        </div>
        <AccordionContent className="w-full">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
