"use client";
import { Bookmark } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/catalog-accordion";

interface SubChapterSidebarItemProps {
  chapterNo: number;
  subChapterNo: number;
  subChapterName: string;
  children?: React.ReactNode;
}

export const SubChapterSidebarItem = ({
  chapterNo,
  subChapterNo,
  subChapterName,
  children,
}: SubChapterSidebarItemProps) => {
  return (
    <div>
      {children && (
        <Accordion type="multiple" className="group">
          <AccordionItem value="group">
            <div className="flex w-full justify-between items-center pr-2">
              <AccordionTrigger className="justify-start items-center space-x-1">
                <Bookmark strokeWidth={1} className="min-w-6 h-6" />{" "}
                <p>
                  {chapterNo}.{subChapterNo}. {subChapterName}
                </p>
              </AccordionTrigger>
            </div>
            <AccordionContent className="w-full pl-5">
              {children}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      {!children && (
        <div className="justify-start items-center space-x-1">
          <Bookmark strokeWidth={1} className="min-w-6 h-6" />{" "}
          <p>
            {chapterNo}.{subChapterNo}. {subChapterName}
          </p>
        </div>
      )}
    </div>
  );
};
