


import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchMovieData } from '../utils/constant copy';
import { addTopRatedMovies } from '../utils/movieSlice';

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    const json = await fetchMovieData('/movie/top_rated?page=1');
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;