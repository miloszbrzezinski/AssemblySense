interface SubChapterItemProps {
  subChapterName: string;
  children: React.ReactNode;
}

export const SubChapterItem = ({
  subChapterName,
  children,
}: SubChapterItemProps) => {
  return (
    <div className="pl-5 mt-3">
      <h3 className="text-xl">{subChapterName}</h3>
      {children}
    </div>
  );
};
