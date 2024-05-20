interface TitleBarProps {
  title: string;
}

export const TitleBar = ({ title }: TitleBarProps) => {
  return (
    <div className="border-b text-xl font-light items-center p-2 bg-white dark:bg-neutral-950 shadow-md">
      <p>{title}</p>
    </div>
  );
};
