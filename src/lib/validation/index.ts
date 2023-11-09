import * as z from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2,{ message: "Name too Short"}),
    username: z.string().min(2, { message: "Username too Short"}),
    email: z.string().min(2, { message: "email too Short"}),
    password: z.string().min(8,{ message: "Password must be at lest 8 characters"}),
  })