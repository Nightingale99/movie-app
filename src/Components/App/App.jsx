"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const MovieList_1 = __importDefault(require("../MovieList/MovieList"));
const Movie_Services_1 = __importDefault(require("../../services/Movie-Services"));
const antd_1 = require("antd");
const react_detect_offline_1 = require("react-detect-offline");
require("./App.css");
const lodash_1 = __importDefault(require("lodash"));
const App = () => {
    const [movies, setMovies] = (0, react_1.useState)({ results: [{ title: '', release_date: '', overview: '', poster_path: '' }], total_pages: 0, total_results: 0 });
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [page, setPage] = (0, react_1.useState)(1);
    const [searching, setSearching] = (0, react_1.useState)('discover');
    const [query, setQuery] = (0, react_1.useState)('');
    const fetchData = (url) => __awaiter(void 0, void 0, void 0, function* () {
        const movieService = new Movie_Services_1.default();
        const moviesData = yield movieService.getResource(url);
        setMovies(moviesData);
        setIsLoading(false);
    });
    (0, react_1.useLayoutEffect)(() => {
        fetchData(`https://api.themoviedb.org/3/${searching}/movie?api_key=4468f3029a8edecefca8d91fa78b1d73&page=${page}&language=ru`);
    }, []);
    console.log(movies);
    const searchMovie = (query) => {
        setPage(1);
        setIsLoading(true);
        setSearching(query === '' ? 'discover' : 'search');
        setQuery(query);
        if (query !== '') {
            fetchData(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=4468f3029a8edecefca8d91fa78b1d73&page=1&language=ru`);
        }
        else {
            fetchData(`https://api.themoviedb.org/3/discover/movie?api_key=4468f3029a8edecefca8d91fa78b1d73&page=1&langueage=ru`);
        }
    };
    const onPageChange = (event) => {
        setIsLoading(true);
        setPage(event);
        fetchData(`https://api.themoviedb.org/3/${searching}/movie?api_key=4468f3029a8edecefca8d91fa78b1d73&page=${event}&query=${query}&language=ru`);
    };
    const onInputChange = lodash_1.default.debounce((event) => {
        searchMovie(event.target.value);
    }, 500);
    console.log(movies);
    if (movies.total_results > 10000) {
        movies.total_results = 10000;
    }
    if (isLoading) {
        return (<antd_1.Flex gap="small" vertical>
      <antd_1.Spin size='large' fullscreen/>
      </antd_1.Flex>);
    }
    else if (movies.total_results > 0) {
        return (<div className='movie-page'>
      <react_detect_offline_1.Offline><antd_1.Alert message="У вас нет интернета, проверьте соединение" type='error'/></react_detect_offline_1.Offline>
      <react_detect_offline_1.Online>
        <antd_1.Button type='primary' shape='default' ghost/>
        <antd_1.Input placeholder='Type to search...' style={{ width: '938px' }} onChange={onInputChange} defaultValue={query}/>
        <MovieList_1.default movies={movies}/> 
        <antd_1.Pagination onChange={onPageChange} current={page} total={movies.total_results} pageSize={20} showSizeChanger={false}/>
      </react_detect_offline_1.Online> 
    </div>);
    }
    else {
        return (<div className='movie-page'>
      <react_detect_offline_1.Offline><antd_1.Alert message="У вас нет интернета, проверьте соединение" type='error'/></react_detect_offline_1.Offline>
      <react_detect_offline_1.Online>
        <antd_1.Input placeholder='Type to search...' style={{ width: '938px' }} onChange={onInputChange}/>
        <antd_1.Alert message='Результатов не найдено' type='error' style={{ width: '940px' }}/>
      </react_detect_offline_1.Online> 
    </div>);
    }
};
exports.default = App;
