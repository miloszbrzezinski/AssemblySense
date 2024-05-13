import { db } from "@/lib/db";

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
            <p className="text-2xl font-light">36h</p>
          </li>
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
