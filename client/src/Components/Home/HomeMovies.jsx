import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Footer from "./Chakra UI Components/Footer";
import { clearMovies, getMovies } from "../../Redux/actions";
import DataList from "../DataList/DataList";
import { Flex } from "@chakra-ui/react";

export default function HomeMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const [page, setPage] = useState(1);
  const [moviesToShow, setMoviesToShow] = useState([]);

  useEffect(() => {
    dispatch(getMovies(page));
    return () => dispatch(clearMovies())
  }, [page]);

  useEffect(() => {
    setMoviesToShow((prev) => prev.concat(movies));
  }, [movies]);

  return (
    <div>
      <Flex as="header" position="fixed" w="100%" zIndex={200}>
                <NavBar/>
      </Flex>
      <DataList data={moviesToShow} next={setPage} />
      <Footer />
    </div>
  );
}
