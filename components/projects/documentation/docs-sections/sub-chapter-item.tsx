interface SubChapterItemProps {
  chapterNo: number;
  subChapterNo: number;
  subChapterName: string;
  children: React.ReactNode;
}

export const SubChapterItem = ({
  chapterNo,
  subChapterNo,
  subChapterName,
  children,
}: SubChapterItemProps) => {
  return (
    <div className="py-4">
      <h3 className="text-xl">
        {chapterNo}.{subChapterNo}. {subChapterName}
      </h3>
      <div className="pl-5 mt-2">{children}</div>
    </div>
  );
};
