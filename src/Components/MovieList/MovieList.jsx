"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Movie_1 = __importDefault(require("../Movie/Movie"));
require("./MovieList.css");
const MovieList = (props) => {
    const { movies } = props;
    const elements = movies.results.map((movie) => {
        const rand_key = (Math.random() + 1).toString(36).substring(7);
        return (<Movie_1.default movie={movie} key={rand_key}/>);
    });
    return (<div className="movie-list">
      {elements}
    </div>);
};
exports.default = MovieList;
