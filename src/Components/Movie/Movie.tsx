import React from 'react';
import './Movie.css';
import { format } from "date-fns";
import {ru} from 'date-fns/locale'

interface MovieProps {
  movie: {
    title:string;
    release_date: string;
    overview: string;
    backdrop_path: string;
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

  const movie_date = format(props.movie.release_date, 'd MMMM yyyy', {locale: ru});
  const picture_link: string = 'https://image.tmdb.org/t/p/w500/' + props.movie.backdrop_path;
  
  return (
      <div className='movie'>
        <img className='movie-image' src={picture_link} alt="movie image" width={183} height={281} />
        <div className='movie-description'>
          <span className='movie-title'>{props.movie.title}</span>
          <span className='movie-date'>{movie_date}</span>
          <div className='genre-tags'>
            <span className="tag">Action</span>
            <span className="tag">Drama</span>
          </div>
          <span className='description-text'>{overview_cutter(props.movie.overview)}</span>
        </div>
      </div>
  );
}

export default Movie;
