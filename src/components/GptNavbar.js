import React from 'react'
import { useSelector } from 'react-redux'

const GptNavbar = () => {
    const gptSearchPlaceholder = useSelector(state=>state.gpt.gptSearchPlaceholder)
    const search = useSelector(state=>state.gpt.search)

    console.log(gptSearchPlaceholder)
  return (
    <div className="w-[50%] bg-gray-900 absolute py-4 px-6 shadow-md mt-[10%]">
      <form className="flex items-center max-w-4xl mx-auto space-x-4">
        <input 
          className="flex-grow py-2 px-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out" 
          placeholder={gptSearchPlaceholder}
          type="text"
        />
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
          type="submit"
        >
         {search}
        </button>
      </form>
    </div>
  )
}

export default GptNavbar
