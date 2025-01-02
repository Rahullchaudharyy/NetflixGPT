import React from 'react'
// import {CDN_IMG_PATH} from '../utils/constant copy'

const MovieCard = ({poster_path}) => {
  const CDN_IMG_PATH = 'https://image.tmdb.org/t/p/original/'
    if(!poster_path) return ;
  return (
    <div className='w-[200px] rounded-md' >

        <img alt='poster_path' src={poster_path ? CDN_IMG_PATH + poster_path :'https://placehold.co/600x400?text='+'Movie' }/>

    </div>
  )
}

export default MovieCard