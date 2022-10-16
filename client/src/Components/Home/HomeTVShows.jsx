import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import Footer from './Chakra UI Components/Footer';
import { clearTvShows, getTvShows } from '../../Redux/actions';
import DataList from '../DataList/DataList';
import { Flex } from '@chakra-ui/react';
import Loader from '../Loader/LoaderCards.jsx';
import Error from '../Error/Error';

export default function HomeTVShows() {
  const dispatch = useDispatch();
  const series = useSelector((state) => state.series);
  const [page, setPage] = useState(1);
  const [seriesToShow, setSeriesToShow] = useState([]);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getTvShows(page));
    return () => dispatch(clearTvShows());
  }, [page]);

  useEffect(() => {
    setSeriesToShow((prev) => prev.concat(series));
  }, [series]);

  if (error) {
    return <Error />;
  } else {
    return (
      <Flex direction="column">
        <Flex as="header" position="fixed" w="100%" zIndex={200}>
          <NavBar />
        </Flex>
        <Flex as="main" mt={16} w="100%" direction="column"></Flex>
        {seriesToShow.length === 0 ? (
          <Loader />
        ) : (
          <DataList data={seriesToShow} next={setPage} />
        )}
        <Footer />
      </Flex>
    );
  }
}
