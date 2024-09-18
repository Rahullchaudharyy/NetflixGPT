import React, { useState } from 'react';
import { CheakValid } from '../utils/validation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { AVATAR_IMAGE } from '../utils/constant';


const Login = () => {
    const [IsLogin, setIsLogin] = useState(true)
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [ERROR, setERROR] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const HandleFormState = (e) => {
        e.preventDefault()
        setIsLogin(!IsLogin)
    }

    const HandleAuth = async (e) => {
        e.preventDefault();
      
        const message = CheakValid(email, password);
        setERROR(message);
      
      
        try {
          if (IsLogin) {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
      
            const { uid, email: userEmail, displayName, photoURL } = user;
            console.log('Signed In User:', user);
      
            dispatch(addUser({ uid, email: userEmail, displayName, photoURL }));
            navigate('/browse');
          } else {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
      
            await updateProfile(user, {
              displayName: name,
              photoURL:AVATAR_IMAGE,
            });
      
            const { uid, email: userEmail, displayName, photoURL } = user;
            console.log('User profile updated successfully:', { uid, userEmail, displayName });
      
            dispatch(addUser({ uid, email: userEmail, displayName, photoURL }));
            navigate('/browse');
          }
          
          setERROR(null);
        } catch (err) {
          setERROR(err.message);
        }
      };
      


    
  

    return (
       
        <div className='min-h-screen min-w-full bg-black sm:bg-[url(https://i.postimg.cc/c4QWf3h8/Netflix-BG.jpg)] bg-cover bg-no-repeat flex flex-col items-center'>
  <div className='h-[40px] w-full flex items-center justify-start pt-8 px-4'>
    <img
      className='h-[70px] sm:h-[90px]'
      src='https://images.ctfassets.net/y2ske730sjqp/6bhPChRFLRxc17sR8jgKbe/6fa1c6e6f37acdc97ff635cf16ba6fb3/Logos-Readability-Netflix-logo.png'
      alt='Logo'
    />
  </div>
  <form className='w-[85vw] sm:w-[50vmin] sm:h-[70vmin] flex flex-col sm:bg-black bg-opacity-50 sm:bg-opacity-80 justify-center gap-4 p-6 sm:p-10 m-5 rounded-md'>
    <h1 className='text-white text-start font-bold text-[7vw] sm:text-[3.5vmin]'>{IsLogin ? "Sign In" : "Sign Up"}</h1>
    {!IsLogin && (
      <input
        placeholder='Name'
        value={name}
        onChange={(e)=>{setname(e.target.value)}}
        className='text-white p-4 sm:p-6 py-3 border border-gray-500 bg-transparent rounded-sm'
        type='text'
      />
    )}
    <input
      placeholder='Email'
      value={email}
      onChange={(e) => setemail(e.target.value)}
      className='text-white p-4 sm:p-6 py-3 border border-gray-500 bg-transparent rounded-sm'
      type='email'
    />
    <input
      placeholder='Password'
      value={password}
      onChange={(e) => setpassword(e.target.value)}
      className='text-white p-4 sm:p-6 py-3 border border-gray-500 bg-transparent rounded-sm'
      type='password'
    />
    <p className='font-semibold text-red-700 text-sm'>
      {ERROR}
    </p>
    <button
      onClick={HandleAuth}
      className='text-white bg-[#E50914] p-4 sm:p-[1.2vmin] rounded-sm'
    >
      {IsLogin ? "Sign In" : "Sign Up"}
    </button>
    <button
      onClick={HandleFormState}
      className='text-white cursor-pointer font-bold text-center p-4 sm:p-[1.2vmin] rounded-sm flex justify-start'
    >
      {IsLogin ?"New to NetflixGPT ? Sign Up" : "Already Have an account ? Sign In"}
      
    </button>
  </form>
</div>

    );
}

export default Login;
