"use client";
import { addComment } from "@/actions/project-issues";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ProjectIssueCommentWithData } from "@/types";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

interface IssueDiscutionComponentProps {
  profileId: string;
  workspaceId: string;
  projectId: string;
  projectIssueId: string;
  projectIssueComments: ProjectIssueCommentWithData[];
}

export const IssueDiscutionComponent = ({
  profileId,
  workspaceId,
  projectId,
  projectIssueId,
  projectIssueComments,
}: IssueDiscutionComponentProps) => {
  const [newComment, setNewComment] = useState<string>("");
  const router = useRouter();

  const sendComment = () => {
    if (newComment.length > 0)
      startTransition(() => {
        addComment(
          profileId,
          workspaceId,
          projectId,
          projectIssueId,
          newComment
        ).then((data) => {
          // setError(data.error);
          if (data) {
            router.refresh();
          }
        });
      });
  };

  return (
    <div className="flex flex-col h-full border bg-white shadow-md">
      <h3 className="whitespace-nowrap text-xl p-2">Discussion</h3>
      <div className="flex flex-col h-full overflow-y-scroll">
        {projectIssueComments.map((comment) => (
          <div key={comment.id} className="flex w-full border-b p-2 space-x-2">
            <Avatar>
              <AvatarImage
                src={comment.projectMember.workspaceMember.profile.imageUrl}
              />
            </Avatar>
            <div>
              <p className="text-sm text-stone-500 space-x-2">
                <span>
                  {comment.projectMember.workspaceMember.profile.name}{" "}
                  {comment.projectMember.workspaceMember.profile.lastName}
                </span>
                <span className="font-thin">
                  {comment.createdAt.getDate()}/
                  {comment.createdAt.getMonth() + 1}/
                  {comment.createdAt.getFullYear()}{" "}
                  {comment.createdAt.getHours()}:
                  {comment.createdAt.getMinutes()}
                </span>
              </p>
              <p className="text-base">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <form onSubmit={sendComment} className="flex border-t w-full">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full h-28 resize-none text-base p-2"
          />
          <button className="w-24 h-full items-center justify-center flex hover:bg-slate-50">
            <Send strokeWidth={1} />
          </button>
        </form>
      </div>
    </div>
  );
};
