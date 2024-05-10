interface SubSectionItemProps {
  chapterNo: number;
  subCharterNo: number;
  sectionNo: number;
  subSectionNo: number;
  subSectionName: string;
  children: React.ReactNode;
}

export const SubSectionItem = ({
  chapterNo,
  subCharterNo,
  sectionNo,
  subSectionNo,
  subSectionName,
  children,
}: SubSectionItemProps) => {
  return (
    <div className="py-2">
      <h4 className="text-lg font-light">
        {chapterNo}.{subCharterNo}.{sectionNo}.{subSectionNo}. {subSectionName}
      </h4>
      <div className="pl-5 mt-2">{children}</div>
    </div>
  );
};
