import Loader from "@/components/shared/Loader";
import UserChat from "@/components/shared/UserChat";
import { useToast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/queryAndMutations";
import { Models } from "appwrite";

function Chat() {
  const { toast } = useToast();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();
  console.log("creators",creators);
  

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    
    return;
  }
  return (
    <div className="all-chat-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img 
          src="/public/assets/icons/chat.svg" 
          width={36}
          height={36}
          alt="chat" 
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">All Chats</h2>
      </div>
      <div className="flex-1 flex">
      {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="">
            {creators?.documents.map((creator: Models.Document) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserChat user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Chat