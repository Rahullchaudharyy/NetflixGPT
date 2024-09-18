import React from 'react'
import {CDN_IMG_PATH} from '../utils/constant copy'

const MovieCard = ({poster_path}) => {

  return (
    <div className='w-[200px] rounded-md' >

        <img alt='poster_path' src={CDN_IMG_PATH + poster_path}/>

    </div>
  )
}

export default MovieCard