import {
  ComponentEventWithData,
  SequenceStepWithEvents,
  SequenceWithSteps,
} from "@/types";
import { StepItem } from "./step-item";

interface ProcessSequenceProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  processId: string;
  sequence: SequenceWithSteps;
  componentEvents: ComponentEventWithData[];
}

export const ProcessSequence = ({
  profileId,
  workspaceId,
  projectId,
  processId,
  sequence,
  componentEvents,
}: ProcessSequenceProps) => {
  return (
    <div className="w-full flex flex-col bg-white border shadow-lg">
      <div className="flex w-full border-b ">
        <p className="p-2 text-lg">{sequence.name}</p>
      </div>
      <div className="flex flex-col w-full border-b ">
        <p className="p-2 text-lg font-light">Description</p>
        <p className="px-2 text-base font-light">{sequence.description}</p>
      </div>
      <div className="flex flex-col overflow-y-scroll  p-5  w-full">
        {sequence.sequenceStep.map((step) => (
          <StepItem
            key={step.id}
            profileId={profileId}
            workspaceId={workspaceId}
            projectId={projectId}
            processId={processId}
            step={step}
            componentEvents={componentEvents}
          />
        ))}

        <div className="flex w-full space-x-5 items-center h-20">
          <div className="w-1/5 flex" />
          <div className="w-4/5 flex h-full">
            <button className="h-full w-2/6 border shadow-md font-light hover:bg-sky-900/20">
              New Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
