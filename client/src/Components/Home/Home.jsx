import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "./Chakra UI Components/Footer";
import MainMovieMenu from "./Chakra UI Components/MainMovieMenu";
import Carrousel from "../Carrousel/Carrousel.jsx"
import { useDispatch, useSelector } from "react-redux";
import { getHomeAll } from "../../Redux/actions";


export default function Home(){

    const dispatch = useDispatch();
    const { movies, loading } = useSelector( state => state)
        
    useEffect( () =>{ if (!movies.allCarruselsMovies) dispatch(getHomeAll()) } , [] );

    if(!loading){
        var movieCarrousel = movies.allCarruselsMovies;
        var SeriesCarrousel = movies.allCarruselsSeries;

        if(movieCarrousel){
            var topTrendingMovie = movieCarrousel.trending[0];
        }
    }


    return (
        
        <div>
            <NavBar/>
            { loading || !movies.allCarruselsMovies  ? "Loading" :
            <div>
            <MainMovieMenu
                title={topTrendingMovie.title}
                id={topTrendingMovie.id}
                poster={topTrendingMovie.back_poster}/>
            <Carrousel movies={movieCarrousel.trending}/>
            <Carrousel movies={movieCarrousel.on_theaters}/>
            <Carrousel movies={movieCarrousel.populars}/>
            <Carrousel movies={movieCarrousel.topRated}/>
            <Carrousel movies={movieCarrousel.upComing}/>
            <Carrousel movies={SeriesCarrousel.topRatedSeries}/>
            <Carrousel movies={SeriesCarrousel.latestSeries}/>
            </div>
            }
            <Footer/>
        </div>
    )
}