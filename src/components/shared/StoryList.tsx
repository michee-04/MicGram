/** @format */

import { useGetStory } from "@/lib/react-query/queryAndMutations"
import { Models } from "appwrite"
import { useEffect, useRef, useState } from "react"
import { useToast } from "../ui/use-toast"
import { DisplayStory } from "./DisplayStory"
import Loader from "./Loader"

function StoryList() {
  const { toast } = useToast()
  const [isStories, setIsStories] = useState<boolean>(false)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const { data: creators, isLoading, isError: isErrorCreators } = useGetStory()
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0)
  // console.log("creat", creators?.documents)

  // const handleSelectStory = (index: string | number) => {
  //   setSelectedStoryIndex(index as number);
  // };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        carouselRef.current &&
        !carouselRef.current.contains(event.target as Node)
      ) {
        // Clic en dehors du Carousel, revenir à la page d'accueil
        setIsStories(false)
      }
    }

    // Ajouter un gestionnaire d'événements pour le clic global
    document.addEventListener("mousedown", handleClickOutside)

    // Nettoyer le gestionnaire d'événements lors du démontage du composant
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [carouselRef])

  if (isErrorCreators) {
    toast({ title: "Something went wrong." })

    return
  }

  // Extraire les informations nécessaires pour CarouselDApiDemo
  const stories = creators?.documents.map((story) => ({
    mediaUrl: story.mediaUrl,
    contenu: story.contenu,
    mediaId: story.mediaId,
    storyId: story.$id,
    // Autres propriétés nécessaires
  }))
  // console.log("stories", stories)

  const toggleStory = (storyId: string) => {
    const index = creators?.documents.findIndex(
      (story) => story.$id === storyId
    )
    if (index !== undefined && index !== -1) {
      // Activer/désactiver le mode histoire et mettre à jour l'index de l'histoire sélectionnée
      setIsStories(!isStories)
      setSelectedStoryIndex(index)
    }
  }

  const handleSelectStory = (index: string | number) => {
    setSelectedStoryIndex(index as number)
    toggleStory(index as string) // Appeler toggleStory avec l'ID de l'histoire
  }

  return (
    <div className={`mt--16 ${isStories ? "overlay" : ""}`}>
      {isLoading && !creators ? (
        <Loader />
      ) : (
        <>
          {isStories ? (
            <div className='opacity'>
              <div ref={carouselRef}>
                <DisplayStory
                  stories={stories}
                  selectedStoryIndex={selectedStoryIndex}
                  onSelectStory={handleSelectStory}
                />
              </div>
            </div>
          ) : (
            <ul className='user-story'>
              {creators?.documents.map((story: Models.Document) => (
                <li key={story?.$id} className='flex-1 min-w-[200px] w-full  '>
                  <img
                    src={story?.creator?.imageUrl || ""}
                    alt='story'
                    className='rounded-full w-12 h-12 lg:h-12 lg:w-12 border border-primary-600 cursor-pointer'
                    onClick={() => toggleStory(story.$id)}
                  />
                  {story?.creator?.name && (
                    <p className='small-regular mt--2'>{story.creator.name}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}

export default StoryList
