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
const App = () => {
    const [movies, setMovies] = (0, react_1.useState)({ results: [{ title: '', release_date: '', overview: '', backdrop_path: '' }] });
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            const movieService = new Movie_Services_1.default();
            const moviesData = yield movieService.getResource('https://api.themoviedb.org/3/discover/movie?api_key=4468f3029a8edecefca8d91fa78b1d73&page=1');
            setMovies(moviesData);
            setIsLoading(false);
        });
        fetchData();
    }, []);
    if (isLoading) {
        return (<antd_1.Flex gap="small" vertical>
      <antd_1.Spin size='large' fullscreen/>
      </antd_1.Flex>);
    }
    else {
        return (<div>
      <react_detect_offline_1.Offline><antd_1.Alert message="У вас нет интернета, проверьте соединение" type='error'/></react_detect_offline_1.Offline>
      <react_detect_offline_1.Online>
        <MovieList_1.default movies={movies}/> 
      </react_detect_offline_1.Online> 
    </div>);
    }
};
exports.default = App;
