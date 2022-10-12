import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "./Chakra UI Components/Footer";
import MainMovieMenu from "./Chakra UI Components/MainMovieMenu";


export default function Home(){
    return (
        <div>
            <NavBar/>
            <MainMovieMenu></MainMovieMenu>
            
            <Footer/>
        </div>
    )
}