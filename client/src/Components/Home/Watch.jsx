import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBarPlayer from "../NavBarPlayer/NavBarPlayer.jsx"

export default function Watch() {
    
    const myMovie = useSelector((state) => state.movieDetail);
    const idTrailer = myMovie.trailer.slice(32)

    const { id } = useParams();
    console.log(id);
        return (
        <>
            <NavBarPlayer/>
                <iframe
                    height={'100%'}
                    width={'100%'}
                    src={`//www.youtube.com/embed/${idTrailer}?autoplay=1`}
                    frameborder="0"
                    allowFullScreen
                    className="youtube"
                    auto
                    title="trailer"
                ></iframe>
        </>
        );

    }