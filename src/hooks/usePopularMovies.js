import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constant'
import { addPopularMovies } from '../utils/movieSlice'


const usePopularMovies = ()=>{

    const dispatch = useDispatch()
    const GetPopularMovies =  async()=>{
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1',API_OPTIONS)
    
        const json = await data.json ()
        dispatch(addPopularMovies(json.results))
    
        // console.log(json.results)
      }
    
      useEffect(()=>{
        GetPopularMovies()
      },[])
}

export default usePopularMovies;