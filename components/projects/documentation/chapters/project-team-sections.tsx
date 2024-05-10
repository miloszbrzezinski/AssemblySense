import { Department } from "@prisma/client";
import { SubChapterItem } from "../docs-sections/sub-chapter-item";
import { db } from "@/lib/db";
import { SectionItem } from "../docs-sections/section-item";
import { SubSectionItem } from "../docs-sections/sub-section-item";
import { ChapterItem } from "../docs-sections/chapter-item";

interface ProjectTeamChapterProps {
  chapterNo: number;
  projectId: string;
}

export const ProjectTeamChapter = async ({
  chapterNo,
  projectId,
}: ProjectTeamChapterProps) => {
  const projectMembersDepartment = await db.projectMember.findMany({
    where: {
      projectId,
    },
    include: {
      workspaceMember: {
        include: {
          department: {
            include: {
              members: {
                include: {
                  projectMembers: {
                    include: {
                      workspaceMember: {
                        include: {
                          profile: true,
                        },
                      },
                      project: true,
                    },
                  },
                },
              },
            },
          },
          profile: true,
        },
      },
    },
  });

  const leaders = await db.projectMember.findMany({
    where: {
      projectId,
      isLeader: true,
    },
    include: {
      workspaceMember: {
        include: {
          profile: true,
          department: true,
        },
      },
    },
  });

  const projectMembers = await db.projectMember.findMany({
    where: {
      projectId,
    },
    include: {
      workspaceMember: {
        include: {
          profile: true,
          department: true,
        },
      },
    },
  });

  const departments = projectMembersDepartment.map((m) => {
    if (m.workspaceMember.department) {
      return m.workspaceMember.department;
    }
  });

  const uniqueDepartments: Department[] = [];

  departments.forEach((d) => {
    let found = false;
    uniqueDepartments.forEach((i) => {
      if (d && d.id === i.id) found = true;
    });
    if (d && !found) {
      uniqueDepartments.push(d);
    }
  });

  return (
    <ChapterItem chapterNo={chapterNo} chapterName="Team">
      <SubChapterItem
        chapterNo={chapterNo}
        subChapterNo={1}
        subChapterName="Leaders"
      >
        <table className="border-collapse relative">
          <thead>
            <tr>
              <th className="border border-stone-800 font-medium px-5">
                Department
              </th>
              <th className="border border-stone-800 font-medium px-5">
                Leader
              </th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader) => (
              <tr key={leader.id}>
                <td className="border border-stone-800 pl-2 px-10">
                  {leader.workspaceMember.department?.name}
                </td>
                <td className="border border-stone-800 pl-2 px-10">
                  {leader.workspaceMember.profile.name}{" "}
                  {leader.workspaceMember.profile.lastName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SubChapterItem>
      <SubChapterItem
        chapterNo={chapterNo}
        subChapterNo={2}
        subChapterName="Team members"
      >
        {uniqueDepartments.map((department, i) => (
          <SectionItem
            chapterNo={chapterNo}
            subCharterNo={2}
            sectionNo={1 + i}
            sectionName={department.name}
          >
            {projectMembers.map(
              (m, j) =>
                department.id === m.workspaceMember.departmentId && (
                  <SubSectionItem
                    chapterNo={chapterNo}
                    subCharterNo={2}
                    sectionNo={1 + i}
                    subSectionNo={1 + j}
                    subSectionName={`${m.workspaceMember.profile.name} ${m.workspaceMember.profile.lastName}`}
                  >
                    ...
                  </SubSectionItem>
                )
            )}
          </SectionItem>
        ))}
      </SubChapterItem>
    </ChapterItem>
  );
};
