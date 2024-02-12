import { Models } from "appwrite";
import { Link } from "react-router-dom";

type UserChatProps = {
  user: Models.Document;
};

const UserChat = ({ user }: UserChatProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className="all-chat-user">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      {/* <div className="flex-center flex-col gap-1"> */}
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
      {/* </div> */}
    </Link>
  );
};

export default UserChat;
