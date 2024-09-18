import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import BackgroundContainer from './BackgroundContainer'
import Navbar from './Navbar'


const Browse = () => {
  useNowPlayingMovies()

  return (
    <div>
      <Navbar/>
      <BackgroundContainer/>
    </div>
  )
}

export default Browse