import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import Footer from './Chakra UI Components/Footer';
import './Home.css';

import {
  clearMovies,
  getMovies,
  getAllGenres,
  getMovieGenreByID,
  clearGenres,
} from '../../Redux/actions';
import DataList from '../DataList/DataList';
import { Box, Center, Divider, Flex, Select, Text } from '@chakra-ui/react';
import Loader from '../Loader/LoaderCards';
import Error from '../Error/Error';
import { color } from '../globalStyles';
import '@fontsource/raleway';

export default function HomeMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const allGenres = useSelector((state) => state.allgenres);
  const [genre2, setGenre2] = useState('All');
  const [page, setPage] = useState(1);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const error = useSelector((state) => state.error);
  const [titulo, setTitulo] = useState('Movies');

  useEffect(() => {
    if (genre2 === 'All' && page !== 1) {
      dispatch(getMovies(page));
    } else if (page !== 1) {
      dispatch(getMovieGenreByID(genre2, page));
    }
  }, [page]);

  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

  useEffect(() => {
    setMoviesToShow([]);
    if (genre2 === 'All') {
      dispatch(getMovies(page));
    } else {
      dispatch(getMovieGenreByID(genre2, page));
    }
    return () => {
      dispatch(clearMovies());
      dispatch(clearGenres());
    };
  }, [genre2]);

  useEffect(() => {
    setMoviesToShow((prev) => prev.concat(movies));
  }, [movies]);

  function handleGenres(e) {
    e.preventDefault();
    let variable = '';
    for (let i = 0; i < allGenres.length; i++) {
      if (allGenres[i].name === e.target.value) {
        variable = allGenres[i].id;
      }
    }
    setPage(1);
    setGenre2(variable);
    if (e.target.value === 'All') {
      setTitulo('Movies');
    } else {
      setTitulo(e.target.value + ' Movies');
    }
  }

  if (error) {
    return <Error />;
  } else {
    return (
      <Flex direction="column" bgGradient="linear(to-b, #222222, #333333)">
        <Flex as="header" position="fixed" w="100%" zIndex={200}>
          <NavBar ruta={'Movies'} />
        </Flex>

        <Flex as="main" mt={16} w="100%" direction="column">
          {moviesToShow.length === 0 ? (
            <Loader />
          ) : (
            <Box>
              <Flex
                direction="row"
                mt={10}
                mb={5}
                justify="space-around"
                alignItems="center"
              >
                {genre2 === 'All' ? (
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
                >
                  <option selected disabled>
                    Genres
                  </option>
                  <option value="All" className="options">
                    All
                  </option>
                  {/* {console.log(allGenres)} */}
                  {allGenres.map((g) => {
                    return (
                      <option value={g} key={g} className="options">
                        {g}
                      </option>
                    );
                  })}
                </Select>
              </Flex>
              <Center>
                <Divider
                  borderColor="white"
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
