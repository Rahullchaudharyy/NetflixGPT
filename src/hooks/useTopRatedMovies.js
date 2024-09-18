import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constant copy'
import { addTopRatedMovies } from '../utils/movieSlice'


const useTopRatedMovies = ()=>{

    const dispatch = useDispatch()
    const GetTopRatedMovies =  async()=>{
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1',API_OPTIONS)
    
        const json = await data.json ()
        dispatch(addTopRatedMovies(json.results))
    
        // console.log(json.results)
      }
    
      useEffect(()=>{
        GetTopRatedMovies()
      },[])
}

export default useTopRatedMovies;