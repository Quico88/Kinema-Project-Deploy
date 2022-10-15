import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "./Chakra UI Components/Footer";
import MainMovieMenu from "./Chakra UI Components/MainMovieMenu";
import CarouselHome from "../Carrousel/Chackra UI Components/CarouselHome";
import { useDispatch, useSelector } from "react-redux";
import { getHomeAll } from "../../Redux/actions";


export default function Home(){

    const dispatch = useDispatch();
    const { carrousels_home, loading } = useSelector( state => state)
        
    useEffect( () =>{ if (!carrousels_home.allCarruselsMovies) dispatch(getHomeAll()) } , [] );

    if(!loading){
        var movieCarrousel = carrousels_home.allCarruselsMovies;
        var SeriesCarrousel = carrousels_home.allCarruselsSeries;

        if(movieCarrousel){
            var topTrendingMovie = movieCarrousel.trending[0];
        }
    }


    return (
        
        <div>
            <NavBar/>
            { loading || !carrousels_home.allCarruselsMovies  ? "Loading" :
            <div>
            <MainMovieMenu
                title={topTrendingMovie.title}
                id={topTrendingMovie.id}
                poster={topTrendingMovie.back_poster}/>
            <CarouselHome movies={movieCarrousel.trending}/>
            <CarouselHome  movies={movieCarrousel.on_theaters}/>
            <CarouselHome  movies={movieCarrousel.populars}/>
            <CarouselHome  movies={movieCarrousel.topRated}/>
            <CarouselHome  movies={movieCarrousel.upComing}/>
            <CarouselHome  movies={SeriesCarrousel.topRatedSeries}/>
            <CarouselHome  movies={SeriesCarrousel.latestSeries}/>
            </div>
            }
            <Footer/>
        </div>
    )
}