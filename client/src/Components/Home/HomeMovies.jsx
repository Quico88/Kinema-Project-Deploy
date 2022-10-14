import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Footer from "./Chakra UI Components/Footer";
import { clearMovies, getMovies, getAllGenres, getAllMovies } from "../../Redux/actions";
import DataList from "../DataList/DataList";


export default function HomeMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const allGenres = useSelector((state) => state.allgenres)
  const allGenres2 = allGenres.filter(e => e.type === "movie")

  const [page, setPage] = useState(1);
  const [moviesToShow, setMoviesToShow] = useState([]);


  useEffect(() => {
    dispatch(getMovies(page));
    dispatch(getAllGenres());
    dispatch(getAllMovies())
    return () => dispatch(clearMovies())
  }, [page]);


  useEffect(() => {
    setMoviesToShow((prev) => prev.concat(movies));
  }, [movies]);



  function handleGenres(e){
    e.preventDefault()
    if(e.target.value === "All"){
    dispatch(getMovies(page))
    setMoviesToShow(movies)}
    else{
    const filtrado = movies.filter(m => m.genres.includes(e.target.value))
    setMoviesToShow(filtrado)
     }
  }


  return (
    <div>
      <NavBar />
      <select onChange={(e) => handleGenres(e)}>
        <option>All</option>


      {
      
      allGenres2.map((g) =>(
        <option value={g.name} key ={g}>{g.name}</option>

      ))}
      </select>

      <DataList data={moviesToShow} next={setPage} />
      <Footer />
    </div>
  );
}