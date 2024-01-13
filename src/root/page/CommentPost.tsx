import { Models } from "appwrite";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useCreateComment } from "@/lib/react-query/queryAndMutations";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

function CommentPot({ post, userId }: PostStatsProps) {

  const [commentContent, setCommentContent] = useState<string>('');
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const commentList = post?.comment?.map((user: Models.Document) => user.$id) || [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comment, setComment] = useState<string[]>(commentList);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate: comentPost } = useCreateComment();



  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCommentPost = async () => {
    try {
    // Vérifiez que le contenu du commentaire n'est pas vide
        if (commentContent.trim() === '') {
          // Gérez le cas où le commentaire est vide
          console.log('Le contenu du commentaire ne peut pas être vide.');
          return;
        }
  
        // Appelez la mutation pour ajouter le commentaire
        const commentData = {
          userId: userId || '',
          postId: post?.$id || '',
          contenu: commentContent,
        };
        // Utilisez la mutation pour ajouter le commentaire
        await comentPost(commentData);
        // Réinitialisez le contenu du commentaire après l'envoi
        setCommentContent('');
        // Désactivez le mode de commentaire
        setIsCommenting(false);


        let commentArray = [...comment];
        if (commentArray.includes(userId)) {
          commentArray = commentArray.filter((Id) => Id !== userId);
        } else {
          commentArray.push(userId);
        }
        setComment(commentArray);

      } catch (error) {
        // Gérez les erreurs lors de l'ajout du commentaire
        console.error("Erreur lors de l'ajout du commentaire :", error);
      }
    };
    

const toggleCommenting = () => {
  // Activez/désactivez le mode de commentaire
  setIsCommenting(!isCommenting);
};

  return (
    <div className="flex gap-2 mr-9">
            {/* Image pour basculer l'état de commentaire */}
            <img
              src="/assets/icons/comment.svg"
              alt="commentaire"
              className="cursor-pointer"
              onClick={toggleCommenting}
            />
            <p className="small-medium lg:base-medium">{comment.length}</p>

            {/* Condition pour afficher les champs d'entrée si isCommenting est vrai */}
            {isCommenting && (
              <>
                <Input
                  type="text"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Ajouter un commentaire"
                  className="shad-input w-full p-2 border border-gray-300 rounded"
                />
                <Button onClick={handleCommentPost}>
                  <img 
                    src="/assets/icons/send.svg"
                    alt="" 
                    width={36}
                    height={36}
                  />
                </Button>
              </>
            )}
            
          </div>
  )
}

export default CommentPot