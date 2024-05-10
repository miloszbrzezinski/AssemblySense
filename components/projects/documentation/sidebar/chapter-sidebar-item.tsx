"use client";
import { Bookmark } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/catalog-accordion";

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
  return (
    <Accordion type="multiple" className="group">
      <AccordionItem value="group">
        <div className="flex w-full justify-between items-center pr-2">
          <AccordionTrigger className="justify-start items-center space-x-1">
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
