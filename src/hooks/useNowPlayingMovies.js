


import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../utils/movieSlice';
import { useEffect } from 'react';
import { fetchMovieData } from '../utils/constant copy';

const useNowPlayingMovies = () => {
  const { nowPlayingMovies } = useSelector(state => state.movies);
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    const json = await fetchMovieData('/movie/now_playing?page=1');
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
