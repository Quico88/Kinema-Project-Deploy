import React from "react";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
  { width: 1600, itemsToShow: 5 },
];

export default function Carrousel({ movies, routeType }) {
  return (
    <div>
      <Carousel breakPoints={breakPoints}>
        {movies.map((m) => {
            if(routeType === 'movie'){
                return (
                    <Link to={'home/movie_details'}>
                      <img
                        src={"https://image.tmdb.org/t/p/w300" + m.poster_path}
                      ></img>
                    </Link>
                  );
            } else {
                return (
                    <Link to={'home/tv_show_details'}>
                      <img
                        src={"https://image.tmdb.org/t/p/w300" + m.poster_path}
                      ></img>
                    </Link>
                  );
            }
        })}
      </Carousel>
    </div>
  );
}
