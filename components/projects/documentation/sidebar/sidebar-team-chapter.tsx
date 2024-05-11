import { db } from "@/lib/db";
import { ChapterSidebarItem } from "./chapter-sidebar-item";
import { SectionSidebarItem } from "./section-sidebar-item";
import { SubChapterSidebarItem } from "./sub-chapter-sidebar-item";
import { SubSectionSidebarItem } from "./sub-section-sidebar-item";
import { Department } from "@prisma/client";

interface SidebarTeamsChapterProps {
  chapterNo: number;
  projectId: string;
}

export const SidebarTeamsChapter = async ({
  chapterNo,
  projectId,
}: SidebarTeamsChapterProps) => {
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
    <ChapterSidebarItem chapterNo={chapterNo} chapterName={"Team"}>
      <SubChapterSidebarItem
        chapterNo={chapterNo}
        subChapterNo={1}
        subChapterName="Leaders"
      />
      <SubChapterSidebarItem
        chapterNo={chapterNo}
        subChapterNo={2}
        subChapterName="Team members"
      >
        {uniqueDepartments.map((department, i) => (
          <SectionSidebarItem
            chapterNo={chapterNo}
            subChapterNo={2}
            sectionNo={1 + i}
            sectionName={department.name}
          />
        ))}
      </SubChapterSidebarItem>
    </ChapterSidebarItem>
  );
};
