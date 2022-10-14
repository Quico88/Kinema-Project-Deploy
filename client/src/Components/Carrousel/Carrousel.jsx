import React from "react";
import Carousel from "./Chackra UI Components/CarouselChackra";
import { Link } from "react-router-dom";
import styles from "./Carrousel.module.css";

const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 },
        { width: 1600, itemsToShow: 5 },
      ];

export default function Carrousel({movies}) {
    
  return (
    <Carousel movies={movies}></Carousel>
  );
}
