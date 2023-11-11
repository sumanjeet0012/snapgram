import { Route,Routes } from 'react-router-dom'
import './globals.css'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import { Home } from './_root/pages'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from "@/components/ui/toaster" // To use toast we have to add it to most outer part of our project.

const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/* public routes */}
            <Route element={<AuthLayout/>}>
              <Route path="/sign-in" element={<SigninForm/>} />
              <Route path="/sign-up" element={<SignupForm/>} />
            </Route>
            {/* Private Routes */}
            <Route element={<RootLayout/>}>
              <Route index element={<Home />}/>
            </Route>
        </Routes>
        <Toaster/> 
    </main>
  )
}

export default App

// Toaster manages global state and needs to be rendered at the top level to function properly