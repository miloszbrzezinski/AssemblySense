"use client";
import {
  Copy,
  Edit,
  File,
  FilePlus,
  Folder,
  FolderPlus,
  Scissors,
  Trash,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./catalog-accordion";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./context-menu";
import { Button } from "./button";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

type NewFileForm = {
  fileName: string;
};

export const Catalog = () => {
  const params = useParams();
  const router = useRouter();
  const [newFile, setNewFile] = useState(false);
  const { register, handleSubmit, setFocus } = useForm<NewFileForm>();
  const onSubmit = (data: NewFileForm) => console.log(data);

  useEffect(() => {
    setFocus("fileName");
  }, [setFocus]);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Accordion type="multiple">
          <AccordionItem value="group">
            <AccordionTrigger className="justify-start items-center space-x-1">
              <Folder strokeWidth={1} className="w-5 h-5" /> <p>Robots</p>
            </AccordionTrigger>
            <AccordionContent className="w-full">
              <Button
                variant="ghost"
                className="p-1 pl-5 h-min justify-start w-full rounded-none space-x-2 hover:bg-slate-200"
                onClick={() => {
                  router.push(`/workspace/${params.workspaceId}/library/kuka`);
                }}
              >
                <File strokeWidth={1} className="w-5 h-5" />
                <div className="space-x-1 flex">
                  <p className="font-light">Kuka</p>
                  <p className="font-extralight">KR1100</p>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="p-1 pl-5 h-min justify-start w-full rounded-none space-x-2 hover:bg-slate-200"
              >
                <File strokeWidth={1} className="w-5 h-5" />
                <div className="space-x-1 flex">
                  <p className="font-light">Kuka</p>
                  <p className="font-extralight">KR1500</p>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="p-1 pl-5 h-min justify-start w-full rounded-none space-x-2 hover:bg-slate-200"
              >
                <File strokeWidth={1} className="w-5 h-5" />
                <div className="space-x-1 flex">
                  <p className="font-light">Kuka</p>
                  <p className="font-extralight">KR2100</p>
                </div>
              </Button>
              {newFile && (
                <div className="p-1 pl-5 h-min flex justify-start w-full rounded-none space-x-2 bg-lime-300/50">
                  <File strokeWidth={1} className="w-5 h-5 text-lime-700" />
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      {...register("fileName")}
                      onBlur={() => {
                        setNewFile(false);
                      }}
                      autoFocus
                      className="w-full"
                    />
                  </form>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="space-x-2">
          <p>Open</p>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => {
            setNewFile(true);
            setFocus("fileName");
          }}
          className="space-x-2"
        >
          <FilePlus strokeWidth={1} className="w-5 h-5" />
          <p>New component</p>
        </ContextMenuItem>
        <ContextMenuItem className="space-x-2">
          <FolderPlus strokeWidth={1} className="w-5 h-5" />
          <p>New folder</p>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="space-x-2">
          <Scissors strokeWidth={1} className="w-5 h-5" />
          <p>Cut</p>
        </ContextMenuItem>
        <ContextMenuItem className="space-x-2">
          <Copy strokeWidth={1} className="w-5 h-5" />
          <p>Copy</p>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="space-x-2">
          <Edit strokeWidth={1} className="w-5 h-5" />
          <p>Rename</p>
        </ContextMenuItem>
        <ContextMenuItem className="space-x-2 text-red-800">
          <Trash strokeWidth={1} className="w-5 h-5" />
          <p>Delete</p>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
