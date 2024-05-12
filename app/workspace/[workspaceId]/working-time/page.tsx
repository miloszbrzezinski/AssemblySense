"use client";
import Timer from "@/components/timer";
import HelloWidget from "@/components/workspace/hello-widget";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function WorkTimePage() {
  return (
    <div className=" w-full flex flex-col">
      <div className="flex h-full items-center justify-center">
        <Timer duration={1} />
      </div>
    </div>
  );
}
