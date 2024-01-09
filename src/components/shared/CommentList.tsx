import { useGetComment, useGetPostById } from "@/lib/react-query/queryAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";


function CommentList() {

  const { id = '' } = useParams();
  const { data: post } = useGetPostById(id || ''); // Utilisez une chaîne vide comme valeur par défaut si id est undefined
  const { data: comment } = useGetComment(id || ''); // Utilisez une chaîne vide comme valeur par défaut si id est undefined
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { user } = useUserContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { data: CommentPost } = useGetComment(); // Utilisez une chaîne vide comme valeur par défaut si id est undefined

  
  return (
    <div className="post_details-info">
            <div className="flex-between w-full">
              <Link to={`/profile/${post?.creator.$id}`} className="flex items-center gap-3">
                <img 
                  src={comment?.creator.imageUrl || '/assets/icons/profile-placeholder.svg'}
                  alt="creator" 
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                />
                
                <div className="flex flex-col">

                  <p className="base-medium lg:body-bold text-light-1">
                    {comment?.creator.name}
                  </p>

                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    <p className="subtle-semibold lg:small-regular">
                      {post?.comment.contenu}
                    </p>
                  </div>

                </div>
              </Link>

            </div>

          </div>
  )
}

export default CommentList