interface SpaceNavbarProps {
  spaceName: string;
  children?: React.ReactNode;
}

export const SpaceNavbar = ({ spaceName, children }: SpaceNavbarProps) => {
  return (
    <div className="w-full items-center h-16 bg-stone-50 dark:bg-zinc-900/30 shadow-md border-b select-none dark:border-neutral-900">
      <div className="flex flex-row justify-between items-center px-5">
        <div className="flex items-center h-16 text-2xl">
          <p className="text-3xl font-light text-stone-900 dark:text-zinc-300 px-2">
            {spaceName}
          </p>
        </div>
        <div className="flex space-x-5 items-center">{children}</div>
      </div>

      <div className="flex flex-row space-x-1"></div>
    </div>
  );
};
