import React from "react";
import NavBar from "../NavBar/NavBar";
import MovieCard from "./Chakra UI Components/MovieCard";
import { Wrap } from '@chakra-ui/react'
import Footer from "./Chakra UI Components/Footer";

export default function HomeTVShows(){

    //fake test con serie "Dahmer"
    const testUrl = 'https://elcomercio.pe/resizer/lS_CUO8cGo2WRJXun5pWLzwEwGk=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/BUBYNVWCSNBQXB7RSWVBKBBKXY.jpg';
    const testId = 123;

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
