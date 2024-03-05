/** @format */

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import FileUploader from "../shared/FileUploader"
import { Textarea } from "../ui/textarea"
// import { type } from './../../types/index';
import { useUserContext } from "@/context/AuthContext"
import {
  useCreateStory,
  useUpdateStory,
} from "@/lib/react-query/queryAndMutations"
import { StoryValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useNavigate } from "react-router-dom"
import Loader from "../shared/Loader"
import { useToast } from "../ui/use-toast"

type PostFormProps = {
  post?: Models.Document
  action: "Create" | "Update"
}

function StoryForm({ post, action }: PostFormProps) {
  const { mutateAsync: createStory, isPending: isLoadingCreate } =
    useCreateStory()
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdateStory()

  const { user } = useUserContext()
  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof StoryValidation>>({
    resolver: zodResolver(StoryValidation),
    defaultValues: {
      contenu: post ? post?.story : "",
      file: [],
    },
  })

  async function onSubmit(values: z.infer<typeof StoryValidation>) {
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...values,
        storyId: post.$id,
        mediaId: post.imageId,
        mediaUrl: post.imageUrl,
        contenu: "",
      })

      if (!updatedPost) {
        toast({ title: "Pleasee try again" })
      }

      return navigate(`/posts/${post.$id}`)
    }
    const newPost = await createStory({
      ...values,
      userId: user.id,
    })

    if (!newPost) {
      toast({
        title: "Please try agin",
      })
    }

    navigate("/")
  }

  return (
    <div className='home-container'>
      <h2 className='h3-bold md:h2-bold text-left w-full'>Create Story</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex-col gap-9 w-full max-w-5xl mx-auto my-auto'>
          <FormField
            control={form.control}
            name='contenu'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label mt-16'>Caption</FormLabel>
                <FormControl>
                  <Textarea
                    className='shad-textarea custom-scrollbar'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='file'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Add Photos</FormLabel>
                <FormControl>
                  <FileUploader
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
              </FormItem>
            )}
          />

          <div className='flex gap-4 items-center justify-end'>
            <Button type='button' className='shad-button_dark_4'>
              Cancel
            </Button>
            <Button
              type='submit'
              className='shad-button_primary whitespace-nowrap'>
              {isLoadingCreate || (isLoadingUpdate && <Loader />)}
              {action} Story
            </Button>
          </div>

        </form>
      </Form>
    </div>
  )
}

export default StoryForm
