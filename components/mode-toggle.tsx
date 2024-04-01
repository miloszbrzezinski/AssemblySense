"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "./ui/toggle";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Toggle
      onClick={() => {
        theme === "dark" ? setTheme("light") : setTheme("dark");
      }}
      className="data-[state=on]:bg-transparent rounded-md flex w-14 items-center justify-center"
      aria-label="mode"
    >
      <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 select-none" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 select-none" />
    </Toggle>
  );
}
