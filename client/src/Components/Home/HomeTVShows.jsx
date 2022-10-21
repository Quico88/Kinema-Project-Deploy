import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import Footer from './Chakra UI Components/Footer';
import {
  clearTvShows,
  getTvShows,
  getTVShowGenres,
  getSeriesByGenre,
  clearGenres,
} from '../../Redux/actions';
import DataList from '../DataList/DataList';
import { Box, Flex, Select, Text, Center, Divider } from '@chakra-ui/react';
import Loader from '../Loader/LoaderCards.jsx';
import Error from '../Error/Error';
import '@fontsource/raleway';

export default function HomeTVShows() {
  const dispatch = useDispatch();
  const series = useSelector((state) => state.series);
  const [page, setPage] = useState(1);
  const [seriesToShow, setSeriesToShow] = useState([]);
  const allGenres = useSelector((state) => state.allgenres);
  const [genre, setGenero] = useState('All');
  const [titulo, setTitulo] = useState('TV Shows');

  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (genre === 'All' && page !== 1) {
      dispatch(getTvShows(page));
    } else if (page !== 1) {
      dispatch(getSeriesByGenre(genre, page));
    }
  }, [page]);

  useEffect(() => {
    dispatch(getTVShowGenres());
  }, []);

  useEffect(() => {
    setSeriesToShow([]);
    if (genre === 'All') {
      dispatch(getTvShows(page));
    } else {
      dispatch(getSeriesByGenre(genre, page));
    }
    return () => {
      dispatch(clearTvShows());
      dispatch(clearGenres());
    };
  }, [genre]);

  useEffect(() => {
    setSeriesToShow((prev) => prev.concat(series));
  }, [series]);

  function handleGenres(e) {
    e.preventDefault();
    setGenero(e.target.value);
    setPage(1);
    if (e.target.value === 'All') {
      setTitulo('TV Shows');
    } else {
      setTitulo(e.target.value + ' TV Shows');
    }
  }
  if (error) {
    return <Error />;
  } else {
    return (
      <Flex direction="column" bgGradient="linear(to-b, #222222, #333333)">
        <Flex as="header" position="fixed" w="100%" zIndex={200}>
          <NavBar ruta={'Series'} />
        </Flex>
        <Flex as="main" mt={16} w="100%" direction="column">
          {seriesToShow.length === 0 ? (
            <Loader />
          ) : (
            <Box>
              <Flex
                direction="row"
                mt={10}
                mb={5}
                justify="space-around"
                alignItems="center"
                color="white"
              >
                <Text fontSize={40} fontWeight="600" fontFamily="Raleway">
                  {titulo}
                </Text>
                <Select
                  onChange={(e) => handleGenres(e)}
                  w="15%"
                  fontSize={25}
                  textAlign="center"
                  fontWeight="500"
                  defaultValue="Genres"
                >
                  <option disabled>Genres</option>
                  <option className="options">All</option>
                  {console.log(allGenres)}
                  {allGenres.map((g, i) => (
                    <option name={g} key={i} value={g} className="options">
                      {g}
                    </option>
                  ))}
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
              <DataList data={seriesToShow} next={setPage} />
            </Box>
          )}
          <Footer />
        </Flex>
      </Flex>
    );
  }
}
