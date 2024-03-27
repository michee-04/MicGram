/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

import Loader from "@/components/shared/Loader"
import UserChat from "@/components/shared/UserChat"
import { useToast } from "@/components/ui/use-toast"
import { useGetUsers } from "@/lib/react-query/queryAndMutations"
import { Models } from "appwrite"

/*import { StreamChat } from "stream-chat"
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const apiKey = "aq45tknd37ma"
*/


function AllChat() {
  const { toast } = useToast()
  // const { id } = useParams();


  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers()
  // const { data: currentUser } = useGetUserById(id || "");

  // const [client, setClient] = useState(null)
  // const [channel, setChannel] = useState(null)

  // const user = currentUser

  // useEffect(() => {
  //   async function init() {
  //     const chatClient = StreamChat.getInstance(apiKey)

  //     await chatClient.connectUser(user, chatClient.devToken(user?.$id))
  //   }

  //   init()
  // }, [])

  if (isErrorCreators) {
    toast({ title: "Something went wrong." })

    return
  }


  return (
    <div className='all-chat-container'>
      <div className='flex gap-2 w-full max-w-5xl'>
        <img
          src='/assets/icons/chat.svg'
          width={36}
          height={36}
          alt='chat'
          className='invert-white'
        />
        <h2 className='h3-bold md:h2-bold text-left w-full'>All Chats</h2>
      </div>
      <div className='flex flex-1 flex-row gap-8'>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className=''>
            {creators?.documents.map((creator: Models.Document) => (
              <li key={creator?.$id} className='flex-1 min-w-[200px] w-full  '>
                <UserChat user={creator} />
              </li>
            ))}
          </ul>
        )}
      <h3 className="pt-80 pl-80 text-bold text-primary-500">Cette fonctionnalité est en cours de dévelopement</h3>
      </div>
    </div>
  )
}

export default AllChat
