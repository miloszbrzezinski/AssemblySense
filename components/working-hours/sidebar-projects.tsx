import { db } from "@/lib/db";
import { Project, WorkingHours } from "@prisma/client";

interface WorkingHoursProjectsSidebarProps {
  profileId: string;
  workspaceId: string;
}

export const WorkingHoursProjectsSidebar = async ({
  profileId,
  workspaceId,
}: WorkingHoursProjectsSidebarProps) => {
  const usersProjects = await db.project.findMany({
    where: {
      workspaceId,
      projectMembers: {
        some: {
          workspaceMember: {
            profileId,
          },
        },
      },
    },
    include: {
      projectMembers: {
        where: {
          workspaceMember: {
            profileId,
          },
        },
        include: {
          workingHours: true,
        },
      },
    },
  });

  const notUsersProjects = await db.project.findMany({
    where: {
      workspaceId,
      NOT: {
        projectMembers: {
          some: {
            workspaceMember: {
              profileId,
            },
          },
        },
      },
    },
  });

  return (
    <div className="flex flex-col h-full border-l pb-20 border-stone-300 shadow-md">
      <h4 className="text-sm font-semibold text-stone-400 uppercase pl-2 select-none py-2">
        My projects
      </h4>
      <ol>
        {usersProjects.map((project) => (
          <ListItem
            key={project.id}
            project={project}
            workingHours={project.projectMembers[0].workingHours}
          />
        ))}
      </ol>
      <h4 className="text-sm font-semibold text-stone-400 uppercase pl-2 select-none py-2 mt-5">
        All projects
      </h4>
      <ol>
        {notUsersProjects.map((project) => (
          <li
            key={project.id}
            className="flex justify-between space-x-10 items-center bg-white/20 w-full whitespace-nowrap px-3 py-2 h-min select-none hover:bg-slate-200"
          >
            <p>
              <span className="font-light text-lg uppercase">
                {project.projectNo}
              </span>
              <br />
              <span className="font-extralight">{project.name}</span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

interface ListItemProps {
  project: Project;
  workingHours: WorkingHours[];
}

const ListItem = ({ project, workingHours }: ListItemProps) => {
  const time = workingHours.reduce((sum, a) => sum + a.value, 0);
  return (
    <li className="flex justify-between space-x-10 items-center bg-white/20 w-full whitespace-nowrap px-3 py-2 h-min select-none hover:bg-slate-200">
      <p>
        <span className="font-light text-lg uppercase">
          {project.projectNo}
        </span>
        <br />
        <span className="font-extralight">{project.name}</span>
      </p>
      <p className="text-2xl font-light">{time}h</p>
    </li>
  );
};
