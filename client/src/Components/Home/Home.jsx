import React, { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from './Chakra UI Components/Footer';
import MainMovieMenu from './Chakra UI Components/MainMovieMenu';
import CarouselHome from '../Carrousel/Chackra UI Components/CarouselHome';
import CarouselWatchList from '../Carrousel/Chackra UI Components/CarouselWatchList';
import CarouselRented from '../Carrousel/Chackra UI Components/CarouselRented';
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
  const userData = useSelector((state) => state.user);

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
              <Container maxW="container.xl" mt={10} />
              {userData.subscription === 2 && userData.watchList.length > 0 ? (
                <CarouselWatchList
                  title="Watchlist"
                  movies={userData.watchList}
                />
              ) : null}
              {userData.subscription === 1 && userData.rented.length > 0 ? (
                <CarouselRented title="Rented" movies={userData.rented} />
              ) : null}
              <Text
                fontWeight={'bold'}
                color={'white'}
                fontSize={{ base: '1xl', md: '3xl' }}
                mb={0}
              >
                Trending :
              </Text>
              <CarouselHome
                movies={movieCarrousel.trending}
                title="Trending:"
              />
              <Text
                fontWeight={'bold'}
                color={'white'}
                fontSize={{ base: '1xl', md: '3xl' }}
                mb={0}
              >
                On Theaters:
              </Text>
              <CarouselHome
                movies={movieCarrousel.on_theaters}
                title="On Theaters:"
              />
              <Text
                fontWeight={'bold'}
                color={'white'}
                fontSize={{ base: '1xl', md: '3xl' }}
                mb={0}
              >
                Popular :
              </Text>
              <CarouselHome movies={movieCarrousel.populars} title="Popular:" />
              <Text
                fontWeight={'bold'}
                color={'white'}
                fontSize={{ base: '1xl', md: '3xl' }}
                mb={0}
              >
                Top rated Movies :
              </Text>
              <CarouselHome
                movies={movieCarrousel.topRated}
                title="Top rated Movies:"
              />
              <Text
                fontWeight={'bold'}
                color={'white'}
                fontSize={{ base: '1xl', md: '3xl' }}
                mb={0}
              >
                Up Coming :
              </Text>
              <CarouselHome
                movies={movieCarrousel.upComing}
                title="Up Coming:"
              />
              <Text
                fontWeight={'bold'}
                color={'white'}
                fontSize={{ base: '1xl', md: '3xl' }}
                mb={0}
              >
                Top rated TV Shows :
              </Text>
              <CarouselHome
                movies={SeriesCarrousel.topRatedSeries}
                title="Top rated TV Shows:"
              />
              <Text
                fontWeight={'bold'}
                color={'white'}
                fontSize={{ base: '1xl', md: '3xl' }}
                mb={0}
              >
                Latests TV Shows :
              </Text>
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
