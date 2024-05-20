import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../public/fonts/IstokWeb-Regular.ttf",
});

export const Logo = ({ className }: { className?: string }) => {
  const censored = false;
  return (
    <Link href="/">
      {censored ? (
        <div className="flex bg-black h-10 w-32"></div>
      ) : (
        <div
          className={cn(
            "hover:opacity-75 transition items-center gap-x-2 flex select-none",
            className
          )}
        >
          <p
            className={cn(
              "hidden md:block text-2xl text-transparent bg-clip-text bg-gradient-to-r from-sky-900 to-amber-900 dark:from-neutral-300 dark:to-stone-300",
              headingFont.className,
              className
            )}
          >
            AssemblySense
          </p>
          <p
            className={cn(
              "md:hidden block text-xl text-transparent bg-clip-text bg-gradient-to-r from-sky-900 to-amber-900 dark:from-neutral-300 dark:to-stone-300",
              headingFont.className,
              className
            )}
          >
            AssemblySense
          </p>
        </div>
      )}
    </Link>
  );
};
