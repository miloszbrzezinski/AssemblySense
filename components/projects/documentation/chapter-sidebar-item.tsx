"use client";
import { Bookmark } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/catalog-accordion";

interface ChapterSidebarItemProps {
  chapterName: string;
}

export const ChapterSidebarItem = ({
  chapterName,
}: ChapterSidebarItemProps) => {
  return (
    <Accordion type="multiple" className="group">
      <AccordionItem value="group">
        <div className="flex w-full justify-between items-center pr-2">
          <AccordionTrigger className="justify-start items-center space-x-1">
            <Bookmark strokeWidth={1} className="min-w-6 h-6" />{" "}
            <p>{chapterName}</p>
          </AccordionTrigger>
        </div>

        <AccordionContent className="w-full"></AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
