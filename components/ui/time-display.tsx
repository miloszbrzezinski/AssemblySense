interface TimeDisplayProps {
  time: string;
}

export const TimeDisplay = ({ time }: TimeDisplayProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-1">
      <div className="flex w-5 h-1 rounded-full bg-stone-400" />
      <div className="w-16 h-16 border-2 border-stone-400 rounded-full flex items-center justify-center">
        <p className="text-lg">{time}</p>
      </div>
    </div>
  );
};
