import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "./Chakra UI Components/Footer";
import MainMovieMenu from "./Chakra UI Components/MainMovieMenu";
import Carrousel from "../Carrousel/Carrousel.jsx"
import { useDispatch, useSelector } from "react-redux";
import { getHomeAll } from "../../Redux/actions";
import { Container, Flex, Stack } from "@chakra-ui/react";


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
        
        <Flex direction="column">
            <Flex as="header" position="fixed" w="100%" zIndex={200}>
                <NavBar/>
            </Flex>
            <Flex as="main" mt={16} w="100%" direction='column'>
                { loading || !carrousels_home.allCarruselsMovies  ? "Loading" :
                <Stack>
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
                </Stack>
                }
                <Footer/>
            </Flex>
        </Flex>
    )
}