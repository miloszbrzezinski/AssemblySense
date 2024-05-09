import { cn } from "@/lib/utils";

interface EnableFormulaProps {
  formula: string;
  className?: string;
  type?: "color" | "transparent";
}

export const EnableFormula = ({
  formula,
  className,
  type = "color",
}: EnableFormulaProps) => {
  return (
    <div className="flex w-full items-center pl-2 space-x-1 overflow-x-scroll">
      {formula.split("+").map((item, i) => (
        <div key={i}>
          {item === "AND" && (
            <span
              className={cn(
                "bg-sky-900/30 dark:bg-sky-500/50 rounded-sm flex px-2",
                type === "transparent" &&
                  "bg-transparent hover:bg-transparent px-0 text-orange-600"
              )}
            >
              AND
            </span>
          )}
          {item === "OR" && (
            <span
              className={cn(
                "bg-sky-900/30 dark:bg-sky-500/50 rounded-sm flex px-2",
                type === "transparent" &&
                  "bg-transparent hover:bg-transparent px-0 text-orange-600"
              )}
            >
              OR
            </span>
          )}
          {item === "NOT" && (
            <span
              className={cn(
                "bg-red-900/30 dark:bg-red-500/50 rounded-sm flex px-2",
                type === "transparent" &&
                  "bg-transparent hover:bg-transparent px-0 text-red-600"
              )}
            >
              NOT
            </span>
          )}
          {item === "(" && (
            <span
              className={cn(
                "bg-stone-900/30 dark:bg-neutral-500/50 rounded-sm flex px-2",
                type === "transparent" &&
                  "bg-transparent hover:bg-transparent px-0 text-blue-400"
              )}
            >
              (
            </span>
          )}
          {item === ")" && (
            <span
              className={cn(
                "bg-stone-900/30 dark:bg-neutral-500/50 rounded-sm flex px-2",
                type === "transparent" &&
                  "bg-transparent hover:bg-transparent px-0 text-blue-400"
              )}
            >
              )
            </span>
          )}
          {item[0] === "$" && (
            <span
              className={cn(
                "bg-amber-900/30 dark:bg-amber-500/50 rounded-sm flex px-2 whitespace-nowrap",
                type === "transparent" &&
                  "bg-transparent hover:bg-transparent px-0"
              )}
            >
              {item.replace("$", "")}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
