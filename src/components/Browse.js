import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import usePopularMovies from '../hooks/usePopularMovies'
import useTopRatedMovies from '../hooks/useTopRatedMovies'
import BackgroundContainer from './BackgroundContainer'
import MainContainer from './MainContainer'
import Navbar from './Navbar'


const Browse = () => {
  useNowPlayingMovies()
  usePopularMovies()
  useTopRatedMovies()

  return (
    <div>
      <Navbar/>
      <BackgroundContainer/>
      <MainContainer/>
    </div>
  )
}

export default Browse