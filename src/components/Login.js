import React, { useState } from 'react';
import { CheakValid } from '../utils/validation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [IsLogin, setIsLogin] = useState(true)
    
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [ERROR, setERROR] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const HandleFormState = (e) => {
        e.preventDefault()
        setIsLogin(!IsLogin)
    }

    const HandleAuth = async (e)=>{
        e.preventDefault()
        
       const message =  CheakValid(email,password)
       setERROR(message)

       try {
        if (IsLogin) {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Signed In User:', userCredential.user);
            dispatch(addUser(email))
            navigate('/browse')

        } else {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Signed Up User:', userCredential.user);
            dispatch(addUser(email))
            navigate('/browse')


        }
        setERROR(null); 
    } catch (err) {
        setERROR(err.message); 
    }   

       


    }


    return (
        <div className='h-[100vh] w-[100vw] bg-black sm:bg-[url(https://i.postimg.cc/c4QWf3h8/Netflix-BG.jpg)] bg-cover bg-no-repeat flex flex-col  items-center'>
            <div className='h-[40px] w-full flex items-center justify-start  pt-8'>
                <img
                    className='h-[90px]'
                    src='https://images.ctfassets.net/y2ske730sjqp/6bhPChRFLRxc17sR8jgKbe/6fa1c6e6f37acdc97ff635cf16ba6fb3/Logos-Readability-Netflix-logo.png'
                    alt='Logo'
                />
            </div>
            <form className='h-[80vmin] w-[100vmin] sm:w-[50vmin] sm:h-[70vmin] flex sm:bg-black bg-opacity-40 flex-col sm:bg-opacity-80 justify-center gap-5 m-10 p-6 sm:py-3 sm:p-10'>
                <h1 className='text-white text-start font-bold text-[5.5vmin] sm:text-[3.5vmin]' >{IsLogin ? "Sign In" : "Sign Up"}</h1>
                {!IsLogin ? <input placeholder='Name' className='text-white p-6 py-5 border border-gray-500 bg-transparent rounded-sm' type='text' /> : ""}
                <input placeholder='Email' value={email} onChange={(e)=> setemail(e.target.value)} className='text-white p-6 py-5 border border-gray-500 bg-transparent rounded-sm' type='email' />
                <input placeholder='password' value={password}  onChange={(e)=> setpassword(e.target.value)} className='text-white p-6 py-5 border border-gray-500 bg-transparent rounded-sm' type='password' />
                <p className='font-semibold text-red-700'>
                    {ERROR}
                </p>
                <button onClick={HandleAuth} className='text-white bg-[#E50914] p-[1.2vmin] rounded-sm' >{IsLogin ? "Sign In" : "Sign Up"}</button>
                <h3 className='text-white text-center' >OR</h3>
                <button onClick={HandleFormState} className='text-white bg-[#333333] text-center p-[1.2vmin] rounded-sm' >{IsLogin ? "Sign Up" : "Sign In"}</button>


            </form>
        </div>
    );
}

export default Login;
