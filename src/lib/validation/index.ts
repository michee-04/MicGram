import * as z from "zod"


export const inscriptionValidation = z.object({
    name: z.string().min(2, { message: "Too short" }),
    username: z.string().min(2, { message: "Too short"}),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at latest 8 characters"}),
  })


export const connexionValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at latest 8 characters"}),
  })


export const PostValidation = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags: z.string(),
  })