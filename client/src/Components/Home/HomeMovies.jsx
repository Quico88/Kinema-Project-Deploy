/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Footer from "./Chakra UI Components/Footer";
import "./Home.css";

import {
  clearMovies,
  getMovies,
  getAllGenres,
  getMovieGenreByID,
} from "../../Redux/actions";
import DataList from "../DataList/DataList";
import { Box, Center, Flex, Select, Text } from "@chakra-ui/react";
import Error from "../Error/Error";
import "@fontsource/raleway";

export default function HomeMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  //const allGenres = useSelector((state) => state.allgenres);
  const [genero, setGenero] = useState("All");
  const [page, setPage] = useState(1);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const error = useSelector((state) => state.error);
  const [titulo, setTitulo] = useState("Movies");

  const allGenres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

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
    if (e.target.value === "All") {
      setGenero("All");
      setTitulo("Movies");
    } else {
      setTitulo(e.target.value + " Movies");
    }
  }

  if (error) {
    return <Error />;
  } else {
    return (
      <Flex direction="column" bgGradient="linear(to-b, #222222, #333333)">
        <Flex as="header" position="fixed" w="100%" zIndex={200}>
          <NavBar ruta={"Movies"} />
        </Flex>

        <Flex as="main" mt={16} w="100%" direction="column">
          <Box>
            <Flex
              direction="row"
              mt={10}
              mb={5}
              justify="space-around"
              alignItems="center"
            >
              {genero === "All" ? (
                <Text
                  fontSize={40}
                  fontWeight="600"
                  color="white"
                  fontFamily="Raleway"
                >
                  Movies
                </Text>
              ) : (
                <Text
                  fontSize={40}
                  fontWeight="600"
                  color="white"
                  fontFamily="Raleway"
                >
                  {titulo}
                </Text>
              )}

              <Select
                onChange={(e) => handleGenres(e)}
                w="15%"
                fontSize={25}
                textAlign="center"
                fontWeight="500"
                color="white"
                defaultValue="Genres"
              >
                <option disabled>Genres</option>
                <option value="All" className="options">
                  All
                </option>
                {allGenres.map((g) => {
                  return (
                    <option value={g.name} key={g.id} className="options">
                      {g.name}
                    </option>
                  );
                })}
              </Select>
            </Flex>
            {moviesToShow.length ? (
              <DataList
                data={moviesToShow}
                next={setPage}
                hasMore={movies.length > 19 && moviesToShow.length !== 0}
              />
            ) : (
              <Center h="90vh">
                <Center w="95%" mb={30} pt={70} pb={70} borderColor="white">
                  <Text fontSize={30} color="white">
                    No results...
                  </Text>
                </Center>
              </Center>
            )}
          </Box>
          <Footer />
        </Flex>
      </Flex>
    );
  }
}
