import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import Footer from './Chakra UI Components/Footer';
import { clearTvShows, getTvShows, getTVShowGenres,getSeriesByGenre } from '../../Redux/actions';
import DataList from '../DataList/DataList';
import { Flex } from '@chakra-ui/react';
import Loader from '../Loader/LoaderCards.jsx';
import Error from '../Error/Error';

export default function HomeTVShows() {
  const dispatch = useDispatch();
  const series = useSelector((state) => state.series);
  const [page, setPage] = useState(1);
  const [seriesToShow, setSeriesToShow] = useState([]);
  const allGenres = useSelector((state) => state.allgenres);
  const [genero, setGenero] = useState('All');

  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (genero === 'All' && page !== 1) {
      dispatch(getTvShows(page));
    } else if (page !== 1) {
      dispatch(getSeriesByGenre(genero, page));
    }
  }, [page]);

  useEffect(() => {
    dispatch(getTVShowGenres())
  }, []);

  useEffect(() => {
    setSeriesToShow([]);
    if (genero === 'All') {
      dispatch(getTvShows(page));
    } else {
      dispatch(getSeriesByGenre(genero, page));
    }
    return () => dispatch(clearTvShows());
  }, [genero]);

  useEffect(() => {
    setSeriesToShow((prev) => prev.concat(series));
  }, [series]);

  function handleGenres(e) {
    e.preventDefault();
    setGenero(e.target.value)
    setPage(1);
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
        <select onChange={(e) => handleGenres(e)}>
          <option>All</option>
          {allGenres.map((g) => (
            <option value={g}>
              {g}
            </option>
          ))}


        </select>
        {seriesToShow.length === 0 ? (
          <Loader />
        ) : (
          <DataList data={seriesToShow} next={setPage} />
        )}
        <Footer />
      </Flex>
    </Flex>
  );
}
