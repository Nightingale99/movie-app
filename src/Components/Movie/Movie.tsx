import React from 'react';
import './Movie.css';
import { format } from "date-fns";
import {ru} from 'date-fns/locale'
import { Rate } from 'antd'

interface MovieProps {
  movie: {
    title:string;
    release_date: string;
    overview: string;
    poster_path: string;
  }
}



const Movie: React.FC<MovieProps> = (props: MovieProps) => {

  const overview_cutter = (overview: string): string => {
    const finalLength = props.movie.title.length > 30 ? 100 : props.movie.title.length > 20 ? 150 : 200;
    if (overview.length > finalLength) {
      let newOverview:string = overview.slice(0, (overview.lastIndexOf(' ', finalLength)));
      if (newOverview.endsWith('.') || newOverview.endsWith(',')) {
        newOverview = newOverview.slice(0, newOverview.length - 1);
      }
      return(newOverview + '...')
    } else {
      return overview;
    }
  }

  
  let movie_date = 'Дата не указана'
  try {
    movie_date = format(props.movie.release_date, 'd MMMM yyyy', {locale: ru});
  } catch (err) {
    console.log(err)
  }
  const picture_link: string = props.movie.poster_path === null ? 
  'https://i.pinimg.com/236x/90/a4/d2/90a4d2530a83f92a9285d68341f2a5c5.jpg' : 
  'https://image.tmdb.org/t/p/w500/' + props.movie.poster_path;
  
  return (
      <div className='movie'>
        <img className='movie-image' src={picture_link} alt="Фильм превью" />
        <div className='movie-description'>
          <span className='movie-title'>{props.movie.title}</span>
          <span className='movie-date'>{movie_date}</span>
          <div className='genre-tags'>
            <span className="tag">Action</span>
            <span className="tag">Drama</span>
          </div>
          <span className='description-text'>{overview_cutter(props.movie.overview)}</span>
          <Rate allowHalf count={10}/>
        </div>
      </div>
  );
}

export default Movie;
