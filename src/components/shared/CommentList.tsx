/* eslint-disable @typescript-eslint/no-explicit-any */
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { Link } from "react-router-dom";

type PostCardProps = {
  post: Models.Document;
}

function CommentList({ post }: PostCardProps) {
  console.log("post", post);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <div className="comment-list">
      {post?.comment.map((comment: { $id: Key | null | undefined; creator: { $id: any; imageUrl: any; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; contenu: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; $createdAt: string | undefined; }) => (
        <div key={comment.$id} className="flex-between w-full mb-4">
          <Link to={`/profile/${comment.creator.$id}`} className="flex items-center gap-3">
            <img
              src={comment.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt="créateur"
              className="rounded-full w-10 h-10 lg:w-10 lg:h-10"
            />
            <div className="flex flex-col">
              <p className="base-medium lg:body-bold text-light-3">
                {comment.creator.name}
              </p>
            </div>

          </Link>

          <p className="text-light-1 ml-4 mr-4">{comment.contenu}</p>
          
            <div className="flex text-light-3">
              <p className="subtle-semibold lg:small-regular flex">
                {multiFormatDateString(comment.$createdAt)}
              </p>
            </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList