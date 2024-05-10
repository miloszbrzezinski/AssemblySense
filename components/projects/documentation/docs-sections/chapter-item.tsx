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
    <div className="py-5">
      <h2 className="text-2xl">
        {chapterNo}. {chapterName}
      </h2>
      <div className="pl-5 mt-2">{children}</div>
    </div>
  );
};
