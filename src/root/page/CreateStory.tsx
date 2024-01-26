/** @format */

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Link } from "react-router-dom"

function CreateStory() {
  const [showStory, setShowStory] = useState(false)

  const handleCreateStory = () => {
    // Mettez à jour l'état pour afficher la page Story et rendre Create Story opaque
    setShowStory(true)
  }

  const handleStoryClose = () => {
    // Mettez à jour l'état pour cacher la page Story et restaurer l'opacité de Create Story
    setShowStory(false)
  }

  return (
    <div>
      <Link
        to={`/story/`}
        className='user-card-story'
        onClick={handleCreateStory}>
        <img
          src={"/assets/icons/plus.svg"}
          alt='creator'
          className={`rounded-full w-5 h-5 ${
            showStory ? "bg-transparent" : "bg-violet"
          }`}
        />

        <Button type='button' size='sm' className='shad-button_primary px-5'>
          Create Story
        </Button>
      </Link>

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
  )
}

export default CreateStory
