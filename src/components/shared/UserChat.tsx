import { Models } from "appwrite";

type UserChatProps = {
  user: Models.Document;
};

const UserChat = ({ user }: UserChatProps) => {
  return (
    <div className="all-chat-user">
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
    </div>
  );
};

export default UserChat;
