import React, { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from './Chakra UI Components/Footer';
import MainMovieMenu from './Chakra UI Components/MainMovieMenu';
import CarouselHome from '../Carrousel/Chackra UI Components/CarouselHome';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeAll } from '../../Redux/actions';
import { Container, Flex, Stack } from '@chakra-ui/react';
import Loader from '../Loader/LoaderCarrusels';
import Error from '../Error/Error.jsx';

export default function Home() {
  const dispatch = useDispatch();
  const { carrousels_home, loading } = useSelector((state) => state);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (!carrousels_home.allCarruselsMovies) dispatch(getHomeAll());
  }, []);

  if (!loading) {
    var movieCarrousel = carrousels_home.allCarruselsMovies;
    var SeriesCarrousel = carrousels_home.allCarruselsSeries;

    if (movieCarrousel) {
      var topTrendingMovie = movieCarrousel.trending[0];
    }
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
          {loading || !carrousels_home.allCarruselsMovies ? (
            <Loader />
          ) : (
            <Stack>
              <MainMovieMenu
                title={topTrendingMovie.title}
                id={topTrendingMovie.id}
                poster={topTrendingMovie.back_poster}
              />
              <CarouselHome movies={movieCarrousel.trending} />
              <CarouselHome movies={movieCarrousel.on_theaters} />
              <CarouselHome movies={movieCarrousel.populars} />
              <CarouselHome movies={movieCarrousel.topRated} />
              <CarouselHome movies={movieCarrousel.upComing} />
              <CarouselHome movies={SeriesCarrousel.topRatedSeries} />
              <CarouselHome movies={SeriesCarrousel.latestSeries} />
            </Stack>
          )}
          <Footer />
        </Flex>
      </Flex>
    );
  }
}
