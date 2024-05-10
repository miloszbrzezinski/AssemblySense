"use client";
import { Bookmark } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/catalog-accordion";

interface SubSectionSidebarItemProps {
  chapterNo: number;
  subChapterNo: number;
  sectionNo: number;
  subSectionNo: number;
  subSectionName: string;
  children: React.ReactNode;
}

export const SubSectionSidebarItem = ({
  chapterNo,
  subChapterNo,
  sectionNo,
  subSectionNo,
  subSectionName,
  children,
}: SubSectionSidebarItemProps) => {
  return (
    <Accordion type="multiple" className="group">
      <AccordionItem value="group">
        <div className="flex w-full justify-between items-center pr-2">
          <AccordionTrigger className="justify-start items-center space-x-1">
            <Bookmark strokeWidth={1} className="min-w-6 h-6" />{" "}
            <p>
              {chapterNo}.{subChapterNo}.{sectionNo}.{subSectionNo}.{" "}
              {subSectionName}
            </p>
          </AccordionTrigger>
        </div>
        <AccordionContent className="w-full">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
