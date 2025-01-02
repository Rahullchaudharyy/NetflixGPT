

import React, { useEffect } from 'react';
import { fetchMovieData } from '../utils/constant copy';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../utils/movieSlice';

const useMovieTrailer = (movieID) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    const json = await fetchMovieData(`/movie/${movieID}/videos`);
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];

    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;