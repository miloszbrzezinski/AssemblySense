"use client";
import { FileClock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/catalog-accordion";

export const ChangeLogItem = () => {
  return (
    <Accordion type="multiple" className="group">
      <AccordionItem value="group">
        <div className="flex w-full justify-between items-center pr-2">
          <AccordionTrigger className="justify-start items-center space-x-1">
            <FileClock strokeWidth={1} className="min-w-6 h-6" />{" "}
            <p>Changelog</p>
          </AccordionTrigger>
        </div>

        <AccordionContent className="w-full"></AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
