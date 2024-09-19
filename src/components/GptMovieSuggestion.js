import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMovieSuggestion = () => {
  
  const {MovieResult,MovieName} = useSelector(state=>state.gpt)
  if(!MovieResult){
     return;
  };
  console.log("MovieResult",MovieResult)

  return (
    <div>

      <MovieList title={MovieResult[0]?.original_title} movies={MovieResult}/>
        {/* WHen the APi would get activated than use the below code  */}
      {/* {MovieResult.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={MovieResult[index]}
          />
        ))} */}



    </div>
  )
}

export default GptMovieSuggestion