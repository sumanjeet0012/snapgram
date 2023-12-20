import * as z from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2,{ message: "Name too Short"}),
    username: z.string().min(2, { message: "Username too Short"}),
    email: z.string().min(2, { message: "email too Short"}),
    password: z.string().min(8,{ message: "Password must be at lest 8 characters"}),
  })

  // it validates the signup form data , like minimum and maximum data length and other stuffs.

  export const SigninValidation = z.object({
    email: z.string().min(2, { message: "email too Short"}),
    password: z.string().min(8,{ message: "Password must be at lest 8 characters"}),
  })

  export const PostValidation = z.object({
    caption: z.string().min(2).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags: z.string(),
  })