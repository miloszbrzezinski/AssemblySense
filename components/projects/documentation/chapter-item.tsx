interface ChapterItemProps {
  chapterName: string;
  children: React.ReactNode;
}

export const ChapterItem = ({ chapterName, children }: ChapterItemProps) => {
  return (
    <div className="pl-5 mt-5">
      <h2 className="text-2xl">{chapterName}</h2>
      {children}
    </div>
  );
};
