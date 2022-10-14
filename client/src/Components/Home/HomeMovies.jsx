import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Footer from "./Chakra UI Components/Footer";
import { getMovies } from "../../Redux/actions";
import DataList from "../DataList/DataList";

export default function HomeMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const [page, setPage] = useState(1);
  const [moviesToShow, setMoviesToShow] = useState([]);

  useEffect(() => {
    dispatch(getMovies(page));
  }, [page]);

  useEffect(() => {
    setMoviesToShow((prev) => prev.concat(movies));
  }, [movies]);

  return (
    <div>
      <NavBar />
      <DataList data={moviesToShow} next={setPage} />
      <Footer />
    </div>
  );
}
