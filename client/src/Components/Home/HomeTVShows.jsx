import React from "react";
import NavBar from "../NavBar/NavBar";
import MovieCard from "./Chakra UI Components/MovieCard";

export default function HomeTVShows(){
    return (
        <div>
            <NavBar/>
            Esta es la Home cuando se selecciona el filtro TV Shows
            <MovieCard/>
        </div>
    )
}
