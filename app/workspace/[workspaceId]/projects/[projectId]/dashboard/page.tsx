import { DashboardCard } from "@/components/projects/dasboard-card";
import { CalendarRange, Flag, SquareCheck, Target, Users } from "lucide-react";

export default function ProjectDashboardPage() {
  return (
    <div className="h-full w-full flex flex-col p-2 gap-2">
      <div className="flex h-2/3 w-full gap-2">
        <DashboardCard
          icon={<Target strokeWidth={1} />}
          title="Project targets"
        >
          Test
        </DashboardCard>
        <DashboardCard icon={<Users strokeWidth={1} />} title="Project members">
          Test
        </DashboardCard>
        <DashboardCard
          icon={<SquareCheck strokeWidth={1} />}
          title="Project tasks"
        >
          Test
        </DashboardCard>
        <DashboardCard icon={<Flag strokeWidth={1} />} title="Project problems">
          Test
        </DashboardCard>
      </div>
      <div className="flex h-1/3 w-full">
        <DashboardCard
          icon={<CalendarRange strokeWidth={1} />}
          title="Project timeline"
        >
          <div className="w-full flex h-full items-center space-x-[1px]">
            <div className="w-full flex h-10 bg-slate-400 hover:scale-y-110 hover:shadow-md hover:shadow-slate-500 transition-all duration-200" />
            <div className="w-full flex h-10 bg-slate-400 hover:scale-y-110 hover:shadow-md hover:shadow-slate-500 transition-all duration-200" />
            <div className="w-full flex h-10 bg-slate-400 hover:scale-y-110 hover:shadow-md hover:shadow-slate-500 transition-all duration-200" />
            <div className="w-full flex h-40 bg-white-500 border rounded-md hover:scale-y-105 transition-all duration-200 shadow-md" />
            <div className="w-full flex h-10 bg-stone-600 hover:scale-y-110 hover:shadow-md hover:shadow-stone-500 transition-all duration-200" />
            <div className="w-full flex h-10 bg-stone-600 hover:scale-y-110 hover:shadow-md hover:shadow-stone-500 transition-all duration-200" />
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
