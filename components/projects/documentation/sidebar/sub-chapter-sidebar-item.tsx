"use client";
import { Bookmark, File } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/catalog-accordion";
import { useRouter } from "next/navigation";

interface SubChapterSidebarItemProps {
  chapterNo: number;
  subChapterNo: number;
  chapterName: string;
  subChapterName: string;
  children?: React.ReactNode;
}

export const SubChapterSidebarItem = ({
  chapterNo,
  subChapterNo,
  chapterName,
  subChapterName,
  children,
}: SubChapterSidebarItemProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`?chapter=${chapterName}&subchapter=${subChapterName}`);
  };

  return (
    <div>
      {children && (
        <Accordion type="multiple" className="group">
          <AccordionItem value="group">
            <div className="flex w-full justify-between items-center pr-2">
              <AccordionTrigger
                onClick={onClick}
                className="justify-start items-center space-x-1"
              >
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
        <div className="flex font-light justify-start items-center space-x-1 pl-6 hover:underline cursor-pointer py-1">
          <File strokeWidth={1} className="min-w-6 h-6" />{" "}
          <p>
            {chapterNo}.{subChapterNo}. {subChapterName}
          </p>
        </div>
      )}
    </div>
  );
};
