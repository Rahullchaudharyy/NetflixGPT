import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import usePopularMovies from '../hooks/usePopularMovies'
import useTopRatedMovies from '../hooks/useTopRatedMovies'
import BackgroundContainer from './BackgroundContainer'
import GptSearch from './GptSearch'
import MainContainer from './MainContainer'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'


const Browse = () => {
  const GptSearchView = useSelector(state=>state.gpt)
  useNowPlayingMovies()
  usePopularMovies()
  useTopRatedMovies()
  // console.log(GptSearchView)

  return (
    <div>
      <Navbar/>
      {GptSearchView.GptSearchView? <GptSearch/>:<>
        <BackgroundContainer/>
        <MainContainer/>
      </>}
     
     
    </div>
  )
}

export default Browse