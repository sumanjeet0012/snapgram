import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from '@/context/AuthContext'



const AuthLayout = () => {

  const {isAuthenticated} = useUserContext();
  console.log(isAuthenticated, "isAuthenticated");

  return (
    <>
    {
      isAuthenticated ? (<Navigate to="/" />) : (
        <>
          <section className='flex flex-1 justify-center items-center flex-col py-10'>
            <Outlet />
          </section>
          {/* The auth layout is rendered first and according to if the user is authenticated or not the user is navigated to different urls.
          The <Outlet> component is used in parent route components to render their child route components (sign in or sign up). */}

          <img src="/assets/images/side-img.svg" alt="logo"
            className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
          />
        </>
      )
    }
    </>
  )
}

export default AuthLayout