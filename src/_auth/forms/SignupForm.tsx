// import { z } from '@/lib/validation'

import { SignupValidation } from '@/lib/validation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form" // It is used to manage forms and form state in React.
import { Button } from "@/components/ui/button" // everything from ui directory is a zod component.
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loader from '@/components/shared/Loader' // it is a normal loading svg used in submit button.
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { createUserAccount } from '@/lib/appwrite/api' // its a function in which user details are passed and it returns a promise.




const SignupForm = () => {

  const isLoading = false;
  // 1 and 2 are zod components.

  
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Do something with the form values.

    const newUser = await createUserAccount(values);

    // ✅ This will be type-safe and validated.
    console.log(newUser)
  }

  return (
    <div>
      <Form {...form}>
        <div className='sm:w-420 flex-center flex-col'>
          <img src="/assets/images/logo.svg" alt="logo" />

          <h2 className='h3-bold sm:h2-bold pt-5 sm:pt-12'>Create a new account</h2>

          <p className='text-light-3 small-medium md:base-regular'>To use Snapgram,Please enter your details</p>



          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type='text' className='shad-input' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type='text' className='shad-input' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='text' className='shad-input' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' className='shad-input' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='shad-button_primary'>{isLoading ? (
              <div className='flex-center gap-2'><Loader />Loading...</div>
            ) : "Sign up"}</Button>

            <p className='text-small-regular text-light-2 text-center mt-2'>Already have an account?
              <Link to="/sign-in" className='text-primary-500 text-small-semibold ml-1 '>Log in</Link>
            </p>

          </form>
        </div>
      </Form>
    </div>
  )
}

export default SignupForm