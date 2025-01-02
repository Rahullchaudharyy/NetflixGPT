

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateGeminiContent, fetchMovieData } from '../utils/constant copy';
import { addGptMovie } from '../utils/gptSlice';
import GptMovieSuggestion from './GptMovieSuggestion';

const GptNavbar = () => {
  const gptSearchPlaceholder = useSelector(state => state.gpt.gptSearchPlaceholder);
  const search = useSelector(state => state.gpt.search);
  const [SearchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const language = useSelector((state) => state.gpt.language);

  const searchMovie = async (movie) => {
    const json = await fetchMovieData(`/search/movie?query=${movie}&include_adult=true&language=en-US&page=1`);
    dispatch(addGptMovie({
      MovieName: json.results.map(movie => movie.original_title),
      MovieResult: json.results
    }));
    return json.results;
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleGPTsearch = async () => {
    setIsLoading(true);
    try {
      const GptQuery = `Act as a movie recommendation system. Given the query "${SearchText}", suggest five movies.`;
      const GPTresponse = await generateGeminiContent(GptQuery);
      
      if (!GPTresponse || typeof GPTresponse !== "string") {
        throw new Error("Invalid GPTresponse");
      }
  
      // Clean up the GPT response to get only movie names (no descriptions)
      const GptMovies = GPTresponse
        .split("\n") // Split by newline to separate each suggestion
        .filter(line => line && !line.includes("suggestions") && !line.includes("styles")) // Exclude non-movie content
        .map(line => {
          const movieTitle = line.match(/^(?:\d+\.\s*)?([^\:\(\)]+)(?:[\(\[].*)?/); // Regex to extract movie title
          return movieTitle ? movieTitle[1].trim() : null;
        })
        .filter(movie => movie && movie.length > 0); 
  
      // console.log("Parsed GptMovies:", GptMovies);
  
      const searchForEach = GptMovies.map(movie => searchMovie(movie));
      const TMDBallMovie = await Promise.all(
        searchForEach.map(promise => promise.catch(error => {
          console.error("Error in Promise.all:", error);
          return [];
        }))
      );
  
      const flattenedMovies = TMDBallMovie.flat();
      // console.log("Flattened Movies:", flattenedMovies);
  
      dispatch(addGptMovie({ MovieName: GptMovies, MovieResult: flattenedMovies }));
    } catch (error) {
      console.error("Error during GPT search:", error);
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
    <div  className="w-full rounded-lg max-w-lg md:max-w-2xl lg:max-w-4xl overflow-hidden bg-gray-900 absolute py-6 px-4 md:px-6 shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
          onClick={handleGPTsearch}
        >
          {search}
        </button>
      </form>
      {isLoading && <p>Loading movies...</p>}
      <GptMovieSuggestion />
    </div>
  );
};

export default GptNavbar;
