import React from "react";
import Movie from "../Movie/Movie";
import './MovieList.css'

interface MovieListProps {
  movies: {
    results: [{
        title: string;
        release_date: string;
        overview: string;
        poster_path: string;
    }],
  },
}

const MovieList: React.FC<MovieListProps> = (props: MovieListProps) => {
    const { movies } = props;
    const elements = movies.results.map((movie) => {
        const rand_key = (Math.random() + 1).toString(36).substring(7);
        return(
            <Movie movie = {movie} key={rand_key} />
        )
    });

  return (
    <div className="movie-list">
      {elements}
    </div>
  );
}

export default MovieList;
