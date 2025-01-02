import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchMovieData } from '../utils/constant copy';
import { addPopularMovies } from '../utils/movieSlice';

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    const json = await fetchMovieData('/movie/popular?page=1');
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;