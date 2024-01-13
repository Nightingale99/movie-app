"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./Movie.css");
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const antd_1 = require("antd");
const Movie = (props) => {
    const overview_cutter = (overview) => {
        const finalLength = props.movie.title.length > 30 ? 100 : props.movie.title.length > 20 ? 150 : 200;
        if (overview.length > finalLength) {
            let newOverview = overview.slice(0, (overview.lastIndexOf(' ', finalLength)));
            if (newOverview.endsWith('.') || newOverview.endsWith(',')) {
                newOverview = newOverview.slice(0, newOverview.length - 1);
            }
            return (newOverview + '...');
        }
        else {
            return overview;
        }
    };
    let movie_date = 'Дата не указана';
    try {
        movie_date = (0, date_fns_1.format)(props.movie.release_date, 'd MMMM yyyy', { locale: locale_1.ru });
    }
    catch (err) {
        console.log(err);
    }
    const picture_link = props.movie.poster_path === null ?
        'https://i.pinimg.com/236x/90/a4/d2/90a4d2530a83f92a9285d68341f2a5c5.jpg' :
        'https://image.tmdb.org/t/p/w500/' + props.movie.poster_path;
    return (<div className='movie'>
        <img className='movie-image' src={picture_link} alt="Фильм превью"/>
        <div className='movie-description'>
          <span className='movie-title'>{props.movie.title}</span>
          <span className='movie-date'>{movie_date}</span>
          <div className='genre-tags'>
            <span className="tag">Action</span>
            <span className="tag">Drama</span>
          </div>
          <span className='description-text'>{overview_cutter(props.movie.overview)}</span>
          <antd_1.Rate allowHalf count={10}/>
        </div>
      </div>);
};
exports.default = Movie;
