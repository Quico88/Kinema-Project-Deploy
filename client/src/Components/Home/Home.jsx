import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "./Chakra UI Components/Footer";
import MainMovieMenu from "./Chakra UI Components/MainMovieMenu";
import Carrousel from "../Carrousel/Carrousel.jsx"

const movies = []

export default function Home(){

    return (
        <div>
            <NavBar/>
            <MainMovieMenu></MainMovieMenu>
            <Carrousel movies={movies}/>
            <Carrousel movies={movies}/>
            <Carrousel movies={movies}/>
            <Carrousel movies={movies}/>
            <Carrousel movies={movies}/>
            <Carrousel movies={movies}/>
            <Footer/>
        </div>
    )
}