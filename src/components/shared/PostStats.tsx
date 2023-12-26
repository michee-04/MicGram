import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { checkIsLiked } from "@/lib/utils";
import {useLikePost,useSavePost,useDeleteSavedPost,useGetCurrentUser } from "@/lib/react-query/queryAndMutations";
import { useUserContext } from "@/context/AuthContext";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

function PostStats ({ post, userId }: PostStatsProps){

  const location = useLocation();
  const likesList = post?.likes?.map((user: Models.Document) => user.$id) || [];
  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();

  useUserContext();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post?.$id || '', likesArray });
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post?.$id || '' });
    setIsSaved(true);
  };


  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

//   const handleCommentPost = async () => {
//     try {
//     // Vérifiez que le contenu du commentaire n'est pas vide
//         if (commentContent.trim() === '') {
//           // Gérez le cas où le commentaire est vide
//           console.log('Le contenu du commentaire ne peut pas être vide.');
//           return;
//         }
  
//         // Appelez la mutation pour ajouter le commentaire
//         const commentData = {
//           userId: user?.id || '',
//           postId: post?.$id || '',
//           contenu: commentContent,
//         };
    
//         // Utilisez la mutation pour ajouter le commentaire
//         await addCommentMutation(commentData);
    
//         // Réinitialisez le contenu du commentaire après l'envoi
//         setCommentContent('');
    
//         // Désactivez le mode de commentaire
//         setIsCommenting(false);
//       } catch (error) {
//         // Gérez les erreurs lors de l'ajout du commentaire
//         console.error('Erreur lors de l\'ajout du commentaire :', error);
//       }
//     };
    

// const toggleCommenting = () => {
//   // Activez/désactivez le mode de commentaire
//   setIsCommenting(!isCommenting);
// };

  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex gap-2 mr-5">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "/public/assets/icons/liked.svg"
              : "/public/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={(e) => handleLikePost(e)}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

    
      <div className="flex gap-2">
      </div>
      <div className="flex gap-2">
        <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="share"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={(e) => handleSavePost(e)}
        />
      </div>
    </div>
  );
};

export default PostStats;
