"use client";
import { Bookmark, File } from "lucide-react";
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
  children?: React.ReactNode;
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
    <div>
      {children && (
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
      )}
      {!children && (
        <div className="flex font-light justify-start items-center space-x-1 hover:underline cursor-pointer py-1">
          <File strokeWidth={1} className="min-w-6 h-6" />{" "}
          <p>
            {chapterNo}.{subChapterNo}.{sectionNo}.{subSectionNo}{" "}
            {subSectionName}
          </p>
        </div>
      )}
    </div>
  );
};
