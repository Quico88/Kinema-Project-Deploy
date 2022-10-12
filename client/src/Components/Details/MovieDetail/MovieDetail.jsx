import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams} from 'react-router-dom';
import { clearMovieDetail, getMovieDetail } from "../../../Redux/actions";

export default function MovieDetail(props) {
    const dispatch = useDispatch();
    let { id } = useParams();
    
    useEffect(() => {
        dispatch(clearMovieDetail());
        dispatch(getMovieDetail(id))
    }, [dispatch])
    
    const myMovie = useSelector(state => state.movieDetail);
    console.log(myMovie);
    return (
			<div>
				{
					myMovie.title ?
						<div>
            	<div>
            		<h1> {myMovie.title} </h1> 
								<p> {myMovie.description} </p>
								<img src={myMovie.poster} alt="" />
							</div>
				
				    	<div>
								<h1>Genres: </h1>
								<span> {myMovie.genres?.map(el => el + (" "))} </span>
							</div>
							<span>Rating: {Math.round(myMovie.rating * 100) / 100} || User reviews: {myMovie.user_reviews} </span>
							<span>Duration: {myMovie.duration} </span>
							<a href={myMovie.trailer}>Trailer</a>
							
						</div>	: <h1>Loading</h1>
        }
        </div>
			
  
    )
}