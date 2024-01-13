import React, { useState, useEffect } from 'react';
import MovieList from '../MovieList/MovieList';
import MovieService from '../../services/Movie-Services';

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
      <div>Loading...</div>
    )
  } else {
  return (
    <MovieList movies={movies} />
  );
  }
};

export default App;
