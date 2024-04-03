import { DepartmentItem } from "@/components/members/department-item";
import { MemberItem } from "@/components/members/member-item";
import { MemberWithProfile } from "@/types";
import { Department } from "@prisma/client";

interface DepartmentsTabProps {
  departmants: Department[];
}
export const DepartmentsTab = ({ departmants }: DepartmentsTabProps) => {
  return (
    <div className="space-y-[1px] shadow-lg bg-neutral-300">
      {departmants.map((departmant) => (
        <DepartmentItem key={departmant.id} department={departmant} />
      ))}
    </div>
  );
};
