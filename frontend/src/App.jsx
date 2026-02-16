import React from 'react'
import { Button } from './components/ui/button'
import Navbar from './components/Navbar'
import Home from './assets/pages/Home'
import Signup from './assets/pages/Signup'
import Login from './assets/pages/Login'
import Verify from './assets/pages/Verify'
import VerifyEmail from './assets/pages/verifyEmail'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Profile from './components/Profile'
const router = createBrowserRouter([
  {
    path : '/',
    element : <><Navbar/> <Home/></>
  },
  {
    path : '/signup',
    element : <> <Signup/></>
  },
  {
    path : '/login',
    element : <> <Login/></>
  },
    {
    path : '/verify',
    element : <> <Verify/></>
  },
    {
    path : '/verify/:token',
    element : <> <VerifyEmail/></>
  },
     {
    path : '/profile',
    element : <><Navbar/> <Profile/></>
  },
])
const App = () => {
  return (
    <>
    <RouterProvider router = {router}/>
    </>
   
  )
}

export default App