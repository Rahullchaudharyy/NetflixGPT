import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constant copy'
import { useDispatch } from 'react-redux'
import { addTrailerVideo } from '../utils/movieSlice'

const useMovieTrailer =(movieID)=>{
    const dispatch = useDispatch()

   const getMovieVideos = async()=>{
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos`,API_OPTIONS)
    const json = await data.json()
    const filterData = json.results.filter((video)=>video.type==="Trailer")
    const trailer =filterData.length? filterData[0]:json.results[0]

    dispatch(addTrailerVideo(trailer))
   //  console.log(trailer)
   }

   useEffect(()=>{
      getMovieVideos()
   },[])
}

export default useMovieTrailer