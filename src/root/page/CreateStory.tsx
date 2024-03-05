/** @format */

import StoryForm from "@/components/forms/StoryForm"
import StoryList from "@/components/shared/StoryList"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useUserContext } from "@/context/AuthContext"

function CreateStory() {

  const { user } = useUserContext()

  return (
    <div className='flex items-center space-x-2 gap-5'>
          <Dialog>
              <DialogTrigger className='flex flex-col items-center mr-10'>
                <img
                  src={
                    user.imageUrl || "/public/assets/icons/profile-placeholder.svg"
                  }
                  alt='creator'
                  className='rounded-full w-12 h-12 lg:h-12 lg:w-12 border border-primary-600'
                />
                Create Story
              </DialogTrigger>
              <DialogContent className="max-w-[900px] w-[90%] h-[90%]">
                <StoryForm action="Create" />
              </DialogContent>
            </Dialog>

      <StoryList />
    </div>
  )
}

export default CreateStory
