import React, { useEffect } from 'react'
import Browse from './Browse'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './Login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'

const Body = () => {
    const dispatch = useDispatch()



    const AppRoute = createBrowserRouter([
        {
            path:'/',
            element:<Login/>,

        },
        {
            path:'/browse',
            element:<Browse/>,

        },

    ])


    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {

                const {uid,email,displayname} = user
                dispatch(addUser({uid:uid,email:email,displayname:displayname}))

                console.log("User signed in:", user);
            } else {
                dispatch(removeUser())
                console.log("User signed out");
            }
        });
    },[])
  return (
    <div>
        <RouterProvider router={AppRoute}>

        </RouterProvider>
    </div>
  )
}

export default Body