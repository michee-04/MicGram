/** @format */

import StoryList from "@/components/shared/StoryList"
import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/AuthContext"
import { useState } from "react"
import { Link } from "react-router-dom"

function CreateStory() {
  const [showStory, setShowStory] = useState(false)
  const { user } = useUserContext()

  const handleCreateStory = () => {
    // Mettez à jour l'état pour afficher la page Story et rendre Create Story opaque
    setShowStory(true)
  }

  const handleStoryClose = () => {
    // Mettez à jour l'état pour cacher la page Story et restaurer l'opacité de Create Story
    setShowStory(false)
  }

  return (
    <div className='flex items-center space-x-2 gap-5'>
      <div className='flex flex-col items-center mr-10'>
        <Link to={`/story/`} onClick={handleCreateStory}>
          <img
            src={
              user.imageUrl || "/public/assets/icons/profile-placeholder.svg"
            }
            alt='creator'
            className='rounded-full w-12 h-12 lg:h-12 lg:w-12 border border-primary-600'
          />
        </Link>
        {/* <PlusIcon className='text-white ml-10 ' /> */}
        <p className='px-5 small-regular'>Story</p>

        {showStory && (
          <div className='overlay'>
            {/* Page Story */}
            <div className='story-container'>
              {/* Contenu de la page Story */}
              <Button type='button' onClick={handleStoryClose}>
                Close Story
              </Button>
            </div>
          </div>
        )}
      </div>

      <StoryList />
    </div>
  )
}

export default CreateStory
