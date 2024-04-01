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
          <div className="w-full flex h-full items-center">
            <div className="w-full flex h-10 bg-red-500" />
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
