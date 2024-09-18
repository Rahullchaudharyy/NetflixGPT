import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const MainContainer = () => {
  const movies = useSelector(state=>state.movies)
  return (
    <div className='h-auto w-auto  flex flex-col bg-black pl-10'>
      <div className='-mt-56 relative z-50'>


      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Top Rated"} movies={movies.topRatedMovies}/>
      <MovieList title={"Popular"} movies={movies.popularMovies}/>
      {/* <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/> */}
      {/* <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/> */}
      </div>

    </div>
  )
}

export default MainContainer