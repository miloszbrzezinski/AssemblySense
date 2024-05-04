import { MoreVertical, Target, Timer } from "lucide-react";

export default function ProjectTargetsPage() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="border-b text-xl items-center p-2 bg-white shadow-md">
        <h2>Project targets</h2>
      </div>
      <table>
        <tbody>
          <tr className="h-20 hover:bg-stone-200 select-none">
            <td className="w-16 max-w-16">
              <div className="flex w-16 items-center justify-center border-stone-400">
                <Timer strokeWidth={1} className="w-12 h-12" />
              </div>
            </td>
            <td className="w-min whitespace-nowrap">
              <div className="border-stone-400/70 border-r border-l px-5">
                <h3 className="text-2xl font-light">Cylce time</h3>
                <p className="font-extralight">
                  Cycle time of the automation processes
                </p>
              </div>
            </td>
            <td className="text-4xl font-light w-full pl-5">86s</td>
            <td className="max-w-14 w-14">
              <div className="flex items-center justify-center">
                <MoreVertical strokeWidth={1} className="w-7 h-7" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
