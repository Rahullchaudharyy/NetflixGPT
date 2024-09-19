import { useDispatch, useSelector } from 'react-redux'
import { addNowPlayingMovies } from '../utils/movieSlice'
import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constant copy'


const useNowPlayingMovies = ()=>{
  
    const {nowPlayingMovies} = useSelector(state=>state.movies)
    console.log(nowPlayingMovies)
    const dispatch = useDispatch()
    const GetNowPlayingMovies =  async()=>{
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1',API_OPTIONS)
    
        const json = await data.json ()
        dispatch(addNowPlayingMovies(json.results))
    
        // console.log(json.results)
      }
    
      useEffect(()=>{
        !nowPlayingMovies&&GetNowPlayingMovies()
      },[])
}

export default useNowPlayingMovies;