interface DonutGraphProps {
  tasksDone: number;
  problems: number;
  total: number;
}

export const DonutGraph = ({ tasksDone, problems, total }: DonutGraphProps) => {
  const radius = 40;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const validTasksDone = Math.min(tasksDone, total);
  const validProblems = Math.min(problems, total - validTasksDone);

  const tasksDonePercentage = (validTasksDone / total) * 100;
  const problemsPercentage = (validProblems / total) * 100;

  const tasksDoneLength = (tasksDonePercentage * circumference) / 100;
  const problemsLength = (problemsPercentage * circumference) / 100;

  return (
    <div className="max-w-xs">
      <svg width="90" height="90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#f3f3f3"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#CE2A13"
          strokeWidth={strokeWidth}
          strokeDasharray={`${problemsLength} ${circumference}`}
          transform="rotate(-90) translate(-100)"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#698b6e"
          strokeWidth={strokeWidth}
          strokeDasharray={`${tasksDoneLength} ${circumference}`}
          strokeDashoffset={-problemsLength}
          transform="rotate(-90) translate(-100)"
        />
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          fontSize="20"
          fill="black"
        >
          {`${tasksDonePercentage.toFixed(0)}%`}
        </text>
      </svg>
    </div>
  );
};
