import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title,movies}) => {
   
    if(!movies) return;
  return (
    <div className='p-8' id='MovieList'>
        <h1 className='font-bold text-3xl text-white'>{title}</h1>
    <div className='flex overflow-x-scroll'>

        <div className='flex gap-6 p-2'>

    

{Array.isArray(movies) && movies.map(movie => (
  <MovieCard key={movie.id} poster_path={movie.poster_path} />
))}


        </div>
        

    </div>
    </div>
  )
}

export default MovieList