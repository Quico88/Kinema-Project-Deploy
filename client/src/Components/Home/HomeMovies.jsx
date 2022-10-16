import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Footer from "./Chakra UI Components/Footer";

import {
  clearMovies,
  getMovies,
  getAllGenres,
  getMovieGenreByID,
} from "../../Redux/actions";
import DataList from "../DataList/DataList";
import { Box, Center, Divider, Flex, Select, Text } from "@chakra-ui/react";
import Loader from "../Loader/LoaderCards";
import Error from "../Error/Error";
import { color } from '../globalStyles'


export default function HomeMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const allGenres = useSelector((state) => state.allgenres);
  const [genero, setGenero] = useState("All");
  const [page, setPage] = useState(1);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const error = useSelector((state) => state.error);
  

  useEffect(() => {
    if (genero === "All" && page !== 1) {
      dispatch(getMovies(page));
    } else if (page !== 1) {
      dispatch(getMovieGenreByID(genero, page));
    }
  }, [page]);

  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

  useEffect(() => {
    setMoviesToShow([]);
    if (genero === "All") {
      dispatch(getMovies(page));
    } else {
      dispatch(getMovieGenreByID(genero, page));
    }
    return () => dispatch(clearMovies());
  }, [genero]);

  useEffect(() => {
    setMoviesToShow((prev) => prev.concat(movies));
  }, [movies]);

  function handleGenres(e) {
    e.preventDefault();
    let variable = "";
    for (let i = 0; i < allGenres.length; i++) {
      if (allGenres[i].name === e.target.value) {
        variable = allGenres[i].id;
      }
    }
    setPage(1);
    setGenero(variable);
  }

  if (error) {
    return <Error />;
  } else {
    return (
      <Flex direction="column">
        <Flex as="header" position="fixed" w="100%" zIndex={200}>
          <NavBar />
        </Flex>

        <Flex as="main" mt={16} w="100%" direction="column">
          {moviesToShow.length === 0 ? (
            <Loader />
          ) : (
            <Box>
              <Flex
                direction="row"
                mt={10}
                mb={10}
                justify="space-around"
                alignItems="center"
              >
                <Text fontSize={40} fontWeight="600">
                  Movies
                </Text>
                <Select
                  onChange={(e) => handleGenres(e)}
                  w="15%"
                  fontSize={25}
                  textAlign="center"
                  fontWeight="500"
                >
                  <option selected="selected" disabled>
                    Genres
                  </option>
                  <option value="All">All</option>
                  {allGenres.map((g) => (
                    <option value={g.name} key={g.id}>
                      {g.name}
                    </option>
                  ))}
                </Select>
              </Flex>
              <Center>
                <Divider
                  borderColor="black"
                  borderWidth="1px"
                  width="30%"
                  border="1px"
                  opacity="1"
                />
              </Center>
              <DataList data={moviesToShow} next={setPage} />
            </Box>
          )}
          <Footer />
        </Flex>
      </Flex>
    );
  }
}
