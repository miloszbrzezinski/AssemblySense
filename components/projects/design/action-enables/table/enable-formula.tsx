interface EnableFormulaProps {
  formula: string;
}

export const EnableFormula = ({ formula }: EnableFormulaProps) => {
  return (
    <div className="flex w-full items-center pl-2 space-x-1 overflow-x-scroll">
      {formula.split("+").map((item, i) => (
        <div key={i}>
          {item === "AND" && (
            <span className="bg-sky-900/30 rounded-sm flex px-2">AND</span>
          )}
          {item === "OR" && (
            <span className="bg-sky-900/30 rounded-sm flex px-2">OR</span>
          )}
          {item === "NOT" && (
            <span className="bg-red-900/30 rounded-sm flex px-2">NOT</span>
          )}
          {item === "(" && (
            <span className="bg-stone-900/30 rounded-sm flex px-2">(</span>
          )}
          {item === ")" && (
            <span className="bg-stone-900/30 rounded-sm flex px-2">)</span>
          )}
          {item[0] === "$" && (
            <span className="bg-amber-900/30 rounded-sm flex px-2 whitespace-nowrap">
              {item}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
