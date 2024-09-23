import React,{useState} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { API_OPTIONS } from '../utils/constant copy'
import { addGptMovie } from '../utils/gptSlice'
import GptMovieSuggestion from './GptMovieSuggestion'

const GptNavbar = () => {
    const gptSearchPlaceholder = useSelector(state=>state.gpt.gptSearchPlaceholder)
    const search = useSelector(state=>state.gpt.search)
    const [SearchText, setSearchText] = useState('')
    const dispatch = useDispatch()
    const language = useSelector((state) => state.gpt.language);
    

    const SearchMovie = async (movie)=>{
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,API_OPTIONS)

        const json = await data.json()
        dispatch(addGptMovie({
          MovieName: json.results.map(movie => movie.original_title), // array of movie names
          MovieResult: json.results
        }));
                  console.log(json.results)
        return json.results;

    }



    const HandleGPTsearch = async()=>{
       console.log(SearchText)


       const GptQueery = "Act as a movie recommendation system. Given the search query "+SearchText+", suggest five movies related to this query. List the movie names in a comma-separated format, similar to the example result: Gadddar, Killelr, Golmal, Koi Mil Gya. In the"+language+"language  "
       console.log(language)

       const GPTresponse = await openai.chat.completions.create({
        messages: [{ role: 'user', content:GptQueery }],
        model: 'gpt-3.5-turbo',
      });

      console.log(GPTresponse)
      const GptMovies = GPTresponse.choices?.[0]?.message.content.split(",")

      const SearchForEach = await GptMovies.map((movie)=>SearchMovie(movie))

      const TMDBallMovie = await Promise.all(SearchForEach)

      

        //  dispatch(addGptMovie(TMDBallMovie)) 
        // UNcomment this line when the API Key would be enable for you !!!
      console.log(TMDBallMovie)
      dispatch(
        addGptMovie({ MvieName: GptMovies, MovieResult: TMDBallMovie })
      );
    }

 

    
    // console.log(gptSearchPlaceholder)
  return (
  

    <div className="w-full rounded-lg max-w-lg md:max-w-2xl lg:max-w-4xl overflow-hidden bg-gray-900 absolute py-6 px-4 md:px-6 shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  <form
    onSubmit={(e) => {
      e.preventDefault();
    }}
    className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
  >
    <input
      className="flex-grow py-2 px-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
      placeholder={gptSearchPlaceholder}
      type="text"
      value={SearchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
        // onClick={HandleGPTsearch} when the api would available
        onClick={() => SearchMovie(SearchText)}
    >
      {search}
    </button>
  </form>
  <GptMovieSuggestion />
</div>

  )
}

export default GptNavbar
