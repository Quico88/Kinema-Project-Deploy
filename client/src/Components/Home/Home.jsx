import React, { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from './Chakra UI Components/Footer';
import MainMovieMenu from './Chakra UI Components/MainMovieMenu';
import CarouselHome from '../Carrousel/Chackra UI Components/CarouselHome';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeAll } from '../../Redux/actions';
import { Container, Flex, Stack, Box, Text } from '@chakra-ui/react';
import Loader from '../Loader/LoaderCarrusels';
import Error from '../Error/Error.jsx';
import { useAuth } from '../AuthContext/AuthContext';
import '@fontsource/raleway';

export default function Home() {
  const { user, logout, loadingUser, read } = useAuth();
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

  if (loadingUser) return null;

  if (error) {
    return <Error />;
  } else {
    return (
      <Flex direction="column" bgGradient="linear(to-b, #222222, #333333)">
        <Flex as="header" position="fixed" w="100%" zIndex={200}>
          <NavBar ruta={'Home'} />
        </Flex>
        <Flex as="main" mt={16} w="100%" direction="column">
          {loading || !carrousels_home.allCarruselsMovies ? (
            <Loader />
          ) : (
            <Box>
              <MainMovieMenu
                title={topTrendingMovie.title}
                id={topTrendingMovie.id}
                poster={topTrendingMovie.back_poster}
              />
              <CarouselHome
                movies={movieCarrousel.trending}
                title="Trending:"
              />
              <CarouselHome
                movies={movieCarrousel.on_theaters}
                title="On Theaters:"
              />
              <CarouselHome movies={movieCarrousel.populars} title="Popular:" />
              <CarouselHome
                movies={movieCarrousel.topRated}
                title="Top rated Movies:"
              />
              <CarouselHome
                movies={movieCarrousel.upComing}
                title="Up Coming:"
              />
              <CarouselHome
                movies={SeriesCarrousel.topRatedSeries}
                title="Top rated TV Shows:"
              />
              <CarouselHome
                movies={SeriesCarrousel.latestSeries}
                title="Latests TV Shows:"
              />
            </Box>
          )}
          <Footer />
        </Flex>
      </Flex>
    );
  }
}
