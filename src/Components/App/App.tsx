import React, { useState, useLayoutEffect } from 'react';
import MovieList from '../MovieList/MovieList';
import MovieService from '../../services/Movie-Services';
import { Spin, Alert, Flex, Pagination, Input, Button} from 'antd';
import {Offline, Online} from 'react-detect-offline';
import './App.css';
import _ from 'lodash';

interface MovieData {
  results: [{
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
  }];
  total_pages: number;
  total_results: number;
}

interface AppProps {
  movies: MovieData;
  searching: string;
  query: string;
}

const App: React.FC<AppProps> = () => {
  const [movies, setMovies] = useState<MovieData>({ results: [{title: '', release_date: '', overview: '', poster_path: ''}] , total_pages:0, total_results: 0});
  const [isLoading, setIsLoading] = useState<boolean> (true);
  const [page, setPage] = useState <number> (1);
  const [searching, setSearching] = useState <string> ('discover');
  const [query, setQuery] = useState <string> ('');
  
  const fetchData = async (url:string) => {
    const movieService = new MovieService();
    const moviesData = await movieService.getResource(url);
    setMovies(moviesData);
    setIsLoading(false);
    
  };
 
  useLayoutEffect(() => {
    fetchData(`https://api.themoviedb.org/3/${searching}/movie?api_key=4468f3029a8edecefca8d91fa78b1d73&page=${page}&language=ru`);
  }, []);
  console.log(movies)

  const searchMovie = (query:string) => {
    setPage(1);
    setIsLoading(true);
    setSearching(query === '' ? 'discover' : 'search');
    setQuery(query);
    if (query !== ''){
    fetchData(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=4468f3029a8edecefca8d91fa78b1d73&page=1&language=ru`)
    } else {
      fetchData(`https://api.themoviedb.org/3/discover/movie?api_key=4468f3029a8edecefca8d91fa78b1d73&page=1&langueage=ru`)
    }
  }

  const onPageChange = (event:number) => {
    setIsLoading(true);
    setPage(event);
    fetchData(`https://api.themoviedb.org/3/${searching}/movie?api_key=4468f3029a8edecefca8d91fa78b1d73&page=${event}&query=${query}&language=ru`)
  }
  
  const onInputChange = _.debounce((event: any) => {
    searchMovie(event.target.value);
  }, 500);
  console.log(movies)

  if (movies.total_results > 10000) {
    movies.total_results = 10000;
  }

  if (isLoading){
    return(
      <Flex gap="small" vertical >
      <Spin size='large' fullscreen/>
      </Flex >
    )
  } else if (movies.total_results > 0){
  return (
    <div className='movie-page'>
      <Offline><Alert message="У вас нет интернета, проверьте соединение" type='error'/></Offline>
      <Online>
        <Button type='primary' shape='default' ghost/>
        <Input 
        placeholder='Type to search...'
        style={{ width: '938px' }}
        onChange={onInputChange}
        defaultValue={query}/>
        <MovieList movies={movies} /> 
        <Pagination 
        onChange={onPageChange} 
        current={page}
        total={movies.total_results}
        pageSize={20}
        showSizeChanger={false}/>
      </Online> 
    </div>
  )
  } else {
    return (
      <div className='movie-page'>
      <Offline><Alert message="У вас нет интернета, проверьте соединение" type='error'/></Offline>
      <Online>
        <Input 
        placeholder='Type to search...'
        style={{ width: '938px' }}
        onChange={onInputChange}/>
        <Alert message='Результатов не найдено' type='error' style={{width: '940px'}}/>
      </Online> 
    </div>
    )
  }
};

export default App;
