import React from "react";
import NavBar from "../NavBar/NavBar";
import MovieCard from "./Chakra UI Components/MovieCard";
import { Wrap } from '@chakra-ui/react'
import Footer from "./Chakra UI Components/Footer";

export default function HomeMovies(){

    //fake test con iron man 3
    const testUrl = 'https://www.cinemascomics.com/wp-content/uploads/2019/07/copia-poster-iron-man-3-marvel.jpg.webp';
    const testId = 68721;

    const renderTestCards = () => {
        let tc = [];
        for (let i = 1; i <= 20; i++) {
            tc.push(    
                <MovieCard
                    posterUrl = {testUrl}
                    testId = {testId}/>
                );
        }
        return tc;
      };
      

    return (
        <div>
            <NavBar/>
            <Wrap justify='center' my='10'>
                {renderTestCards()}
            </Wrap>
            <Footer/>
        </div>
    )
}
