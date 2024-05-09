import { AssemblyProcess } from "@prisma/client";
import { SubChapterItem } from "./sub-chapter-item";

interface ProcessSectionProps {
  process: AssemblyProcess;
}

export const ProcessSection = ({ process }: ProcessSectionProps) => {
  const processName = `${process.processId} ${process.name}`;
  return (
    <SubChapterItem subChapterName={processName}>
      <div className="pl-5">
        <h4 className="text-lg">Components</h4>
      </div>
      <div className="pl-5">
        <h4 className="text-lg">I/O list</h4>
      </div>
      <div className="pl-5">
        <h4 className="text-lg">Action enables</h4>
      </div>
      <div className="pl-5">
        <h4 className="text-lg">Sequences</h4>
      </div>
    </SubChapterItem>
  );
};
