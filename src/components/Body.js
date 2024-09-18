import React, { useEffect } from 'react';
import Browse from './Browse';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();

  const AppRoute = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/browse',
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName,photoURL } = user;
        dispatch(addUser({ uid, email, displayName ,photoURL}));

        console.log("User signed in:", user);
        console.log("Dispatched user:", { uid, email, displayName,photoURL });
      } else {
        dispatch(removeUser());
        console.log("User signed out");
      }
    });
  }, [dispatch]); 

  return (
    <div>
      <RouterProvider router={AppRoute} />
    </div>
  );
};

export default Body;
