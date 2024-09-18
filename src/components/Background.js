import React from 'react'
import useMovieTrailer from '../hooks/useMovieTrailer'
import { useSelector } from 'react-redux'


const Background = ({movieID}) => {
    const trailerVideo  = useSelector(state=>state.movies?.trailerVideo)


    useMovieTrailer(movieID)

  return (
    <div>
        <iframe className='w-screen pointer-events-none aspect-video bg-gradient-to-b from-black' src={"https://www.youtube.com/embed/Icnysn53neU?si="+trailerVideo?.key+"?&autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&fs=0&playsinline=1&rel=0"} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" ></iframe>
          


     

    </div>
  )
}

export default Background