import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/userCard";
import { useToast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/queryAndMutations";
import { Models } from "appwrite";

const TopCreator = () => {
  const { toast } = useToast();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    
    return;
  }

  return (
    <div className="home-creators">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">Top Creator</h2>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid-creator">
            {creators?.documents.map((creator: Models.Document ) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopCreator;
