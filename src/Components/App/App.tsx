import React, { useState, useEffect } from 'react';
import MovieList from '../MovieList/MovieList';
import MovieService from '../../services/Movie-Services';
import { Spin, Alert, Flex } from 'antd';
import {Offline, Online} from 'react-detect-offline';

interface MovieData {
  results: [{
    title: string;
    release_date: string;
    overview: string;
    backdrop_path: string;
  }];
}

interface AppProps {
  movies: MovieData;
}

const App: React.FC<AppProps> = () => {
  const [movies, setMovies] = useState<MovieData>({ results: [{title: '', release_date: '', overview: '', backdrop_path: ''}] });
  const [isLoading, setIsLoading] = useState<boolean> (true);
  useEffect(() => {
    const fetchData = async () => {
      const movieService = new MovieService();
      const moviesData = await movieService.getResource('https://api.themoviedb.org/3/discover/movie?api_key=4468f3029a8edecefca8d91fa78b1d73&page=1');
      setMovies(moviesData);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  if (isLoading){
    return(
      <Flex gap="small" vertical >
      <Spin size='large' fullscreen/>
      </Flex >
    )
  } else {
  return (
    <div>
      <Offline><Alert message="У вас нет интернета, проверьте соединение" type='error'/></Offline>
      <Online>
        <MovieList movies={movies} /> 
      </Online> 
    </div>
  );
  }
};

export default App;
