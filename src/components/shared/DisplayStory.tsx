/** @format */

// DisplayStory.tsx

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import * as React from "react"
// import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"

interface Story {
  mediaUrl: string
  contenu: string
  storyId: string
  // Ajoutez d'autres propriétés nécessaires
}

interface DisplayStoryProps {
  stories?: Story[]
  selectedStoryIndex: number
  onSelectStory: (index: string | number) => void
}

export function DisplayStory({
  stories,
  selectedStoryIndex,
  onSelectStory,
}: DisplayStoryProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  // console.log("stories", stories);

  React.useEffect(() => {
    if (api) {
      // Mettre à jour l'index de la story sélectionnée lorsque le carousel change
      const handleSelect = () => {
        const selectedIndex = api.selectedScrollSnap()
        onSelectStory(selectedIndex)
      }

      api.on("select", handleSelect)

      return () => {
        api.off("select", handleSelect)
      }
    }
  }, [api, onSelectStory])

  return (
    <div>
      <Carousel setApi={setApi} className='w-full max-w-xs' auto={5000}>
        <CarouselContent>
          {stories?.map((story, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className='flex aspect-square items-center justify-center p-6'>
                  <img
                    src={story.mediaUrl}
                    alt={`story-${index + 1}`}
                    className='w-full h-full cursor-pointer'
                    onClick={() => onSelectStory(story.storyId)} // Utilisez le storyId
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className='py-2 text-center text-sm text-muted-foreground'>
        {/* Afficher le contenu de la story sélectionnée */}
        {stories && stories.length > 0 && (
          <p>{stories[selectedStoryIndex].contenu}</p>
        )}
      </div>

      {/* <Dialog>
              <DialogTrigger className=''>
                
              </DialogTrigger>
              <DialogContent className="max-w-[900px] w-[90%] h-[90%] flex flex-col items-center mr-10">
              {stories?.map((story, index) => (
                <div key={index}>
                <div>
                  <div className='flex aspect-square items-center justify-center p-6'>
                    <img
                      src={story.mediaUrl}
                      alt={`story-${index + 1}`}
                      className='w-full h-full cursor-pointer'
                      onClick={() => onSelectStory(story.storyId)} // Utilisez le storyId
                    />
                  </div>
                </div>
                </div>
                ))}
              </DialogContent>
            </Dialog> */}
    </div>
  )
}
