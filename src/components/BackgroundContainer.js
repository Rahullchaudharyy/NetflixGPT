import React from 'react'
import { useSelector } from 'react-redux'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Background from './Background'
import Title from './Title'


const BackgroundContainer = () => {
    const movies = useSelector(state=>state.movies?.nowPlayingMovies)
    if (movies===null) return;


    const mainMovie = movies[5] // 3<4<5
    const {original_title,overview,id} = mainMovie;
    // console.log(original_title)
    // console.log(overview)
    // console.log(mainMovie)
  return (
    <div className='h-[100vh] w-[100vw]   items-center justify-start ' >
        < Title title={original_title} overview={overview}/>
        <Background movieID={id}/>

    </div>
  )
}

export default BackgroundContainer



