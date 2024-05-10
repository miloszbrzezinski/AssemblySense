interface SectionItemProps {
  chapterNo: number;
  subCharterNo: number;
  sectionNo: number;
  sectionName: string;
  children: React.ReactNode;
}

export const SectionItem = ({
  chapterNo,
  subCharterNo,
  sectionNo,
  sectionName,
  children,
}: SectionItemProps) => {
  return (
    <div className="pl-5 mt-2">
      <h4 className="text-lg">
        {chapterNo}.{subCharterNo}.{sectionNo}. {sectionName}
      </h4>
      <div className="pl-5 my-5 mt-4">{children}</div>
    </div>
  );
};
