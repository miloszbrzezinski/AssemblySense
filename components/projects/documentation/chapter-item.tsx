interface ChapterItemProps {
  chapterNo: number;
  chapterName: string;
  children: React.ReactNode;
}

export const ChapterItem = ({
  chapterNo,
  chapterName,
  children,
}: ChapterItemProps) => {
  return (
    <div className="pl-5 mt-5">
      <h2 className="text-2xl">
        {chapterNo}. {chapterName}
      </h2>
      {children}
    </div>
  );
};
