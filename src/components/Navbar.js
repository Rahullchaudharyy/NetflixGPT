import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { setlanguage, toggleGptSearchView } from '../utils/gptSlice';
import lang from '../utils/languageConstant';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch  = useDispatch()
  const user = useSelector((state) => state.user.user);
  const { displayName, photoURL } = user || {}; 
  const languageKeys = Object.keys(lang);
  const GptSearchView = useSelector(state=>state.gpt.GptSearchView)

  // console.log(languageKeys)
  const [selectedLanguage, setSelectedLanguage] = useState(languageKeys[0]); // Default to first language

  
  // console.log('Profile Photo URL:', photoURL);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // console.log("Sign Out successfully");
      // navigate('/');
    } catch (error) {
      // console.error("Error signing out:", error);
      // navigate('/');
    }
  };
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName,photoURL } = user;
        dispatch(addUser({ uid, email, displayName ,photoURL}));

        // console.log("User signed in:", user);
        // console.log("Dispatched user:", { uid, email, displayName,photoURL });
        navigate('/browse')
      } else {
        dispatch(removeUser());
        // console.log("User signed out");
        navigate('/')
      }
    });

    return ()=> unsubscribe()
  }, []); 

  const HandleGptView = ()=>{
    dispatch(toggleGptSearchView())
  }


  const HandleLanguageState = (event) => {
    const selectedLangKey = event.target.value;
    const selectedLang = lang[selectedLangKey];
    setSelectedLanguage(selectedLangKey); 
     
    
    dispatch(setlanguage({
      language: selectedLangKey, 
      search: selectedLang.search,  // Dispatching the search label
      placeholder: lang[selectedLangKey].gptSearchPlaceholder
    }));
  };


  return (
    <div className='h-[70px] w-full bg-transparent flex fixed z-[99] bg-gradient-to-b from-black'>
      <div className='w-[50%] h-full bg-yellow-5000 flex items-center'>
        <img
          className='h-full sm:h-[90px]'
          src='https://images.ctfassets.net/y2ske730sjqp/6bhPChRFLRxc17sR8jgKbe/6fa1c6e6f37acdc97ff635cf16ba6fb3/Logos-Readability-Netflix-logo.png'
          alt='Logo'
        />
      </div>

      <div className='w-[50%] relative h-full bg-green-8000 flex justify-end p-2 gap-3 items-center'>
         {GptSearchView&& <select
          className="border bg-transparent text-white rounded p-2"
          value={selectedLanguage}
          onChange={HandleLanguageState} // Trigger onChange
        >
          {languageKeys.map((key) => (
            <option className='bg-black' key={key} value={key}>
              {key}
            </option>
          ))}
        </select>}
        <button onClick={HandleGptView} className='text-white bg-purple-700 p-2 rounded-md'>{!GptSearchView?"GPT Search":"Back To Browse"}</button>
        {photoURL ? (
          <img
            alt='Profile'
            className='h-[50px] w-[50px] rounded-xl'
            src={photoURL?photoURL:'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg'}
          />
        ) : (
          <img
          alt='Profile'
          className='h-[50px] w-[50px] '
          src='https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg'
        />
        )}
        <button
          onClick={handleSignOut}
          className='bg-red-600 text-white p-2 rounded-sm hover:bg-red-700'
        >
          Sign out
        </button>
        <h1>{displayName?displayName:" "}</h1>
      </div>
    </div>
  );
};

export default Navbar;
