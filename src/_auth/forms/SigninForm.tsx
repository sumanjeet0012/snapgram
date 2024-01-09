// import { z } from '@/lib/validation'

import { SigninValidation } from '@/lib/validation'
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
import { Link,useNavigate } from 'react-router-dom'
import { z } from 'zod'
// import { createUserAccount } from '@/lib/appwrite/api' // its a function in which user details are passed and it returns a promise.
import { useToast } from "@/components/ui/use-toast" // it is imported from shadcn and used to show toast.
import { useSignInAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'




const SigninForm = () => {
  const {toast} = useToast(); // it is a function which is used to show toast.

  const { checkAuthUser, isLoading: isUserLoading} = useUserContext();

  // It uses context API to pass checkAuthUser, isLoading to components where it is needed without prop drilling.

  const navigate = useNavigate();

  const { mutateAsync: signInAccount } = useSignInAccount();

  // useSignInAccount is a custom hook which uses useMutation hook from tanstack/react-query and returns many things like isPending mutateAsync and much more. We destructure only those things which we are going to use.
  // when mutateAsync function is called it executes the mutation function passed to useMutation hook (i.e signInAccount) and returns a promise. If the promise is resolved then it returns the data returned by the mutation function and if the promise is rejected then it returns the error.
  // signInAccount is alias for mutateAsync .
  // 1 and 2 are zod components.

  
  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log("values" + values)
    const session = await signInAccount({email: values.email, password: values.password});
    console.log("session" + session)

    if(!session){
      return toast({
        title: "Sign in failed, please try again..."})
    }

    const isLoading = await checkAuthUser();
    console.log("isLoading" + isLoading);

    if(isLoading){
      form.reset();
      navigate('/')
    }else{
      toast({
        title: "Sign in failed, please try again"
      })
    }

  }

  return (
    <div>
      <Form {...form}>
        <div className='sm:w-420 flex-center flex-col'>
          <img src="/assets/images/logo.svg" alt="logo" />

          <h2 className='h3-bold sm:h2-bold pt-5 sm:pt-12'>Log in to your account</h2>

          <p className='text-light-3 small-medium md:base-regular'>Welcome back!, Please enter your details</p>



          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4 ">
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
            <Button type="submit" className='shad-button_primary'>{isUserLoading ? (
              <div className='flex-center gap-2'><Loader />Loading...</div>
            ) : "Sign in"}</Button>

            <p className='text-small-regular text-light-2 text-center mt-2'>Don't have an account?
              <Link to="/sign-up" className='text-primary-500 text-small-semibold ml-1 '>Sign up</Link>
            </p>

          </form>
        </div>
      </Form>
    </div>
  )
}

export default SigninForm