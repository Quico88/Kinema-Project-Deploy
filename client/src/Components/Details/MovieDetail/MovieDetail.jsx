import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { clearMovieDetail, getMovieDetail } from '../../../Redux/actions';
import { Box, Flex, Heading, Text, Container, Button, Link } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { MdPlayArrow } from 'react-icons/md';
import Footer from '../../Home/Chakra UI Components/Footer.jsx';
import NavBar from '../../NavBar/NavBar.jsx';
import { useState } from 'react';
import './MovieDetail.css';
import NavBarPlayer from '../../NavBarPlayer/NavBarPlayer';
import Loader from '../../Loader/LoaderDetails.jsx';
import Error from '../../Error/Error.jsx';

export default function MovieDetail() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [playTrailer, setPlayerTrailer] = useState(false);
  const error = useSelector((state) => state.error);
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(clearMovieDetail());
    dispatch(getMovieDetail(id));
  }, [dispatch]);

  const myMovie = useSelector((state) => state.movieDetail);

  const closePlayer = () => setPlayerTrailer(false);

  const renderTrailer = () => {
    const idTrailer = myMovie.trailer.slice(32);
    return (
      <>
        <NavBarPlayer closePlayer={closePlayer}/>
        <iframe
          height={'100%'}
          width={'100%'}
          src={`//www.youtube.com/embed/${idTrailer}?autoplay=1`}
          frameborder="0"
          allowFullScreen
          className="youtube"
          auto
          title="trailer"
        ></iframe>
      </>
    );
  };

  const renderPage = () => {
    return (
      <Flex direction="column">
        <Flex as="header" position="fixed" w="100%" zIndex={200}>
          <NavBar />
        </Flex>
        {myMovie.title ? (
          <Flex
            as="main"
            mt={16}
            w={'full'}
            h={'85vh'}
            backgroundImage={myMovie.back_poster.includes('https://image.tmdb.org') ? myMovie.back_poster : 'https://image.tmdb.org/t/p/original/'+myMovie.back_poster}
            backgroundSize={'cover'}
            backgroundPosition={'center center'}
            boxShadow="80vh 0px 128px 64px black inset"
            justify="left"
          >
            <Container maxW="900px" ms="none" ml="10vh" mt="10vh">
              <Heading
                m="2vh"
                size="3xl"
                textAlign="left"
                noOfLines={2}
                color="white"
                fontWeight="bold"
              >
                {myMovie.title}
              </Heading>
              <Text fontSize="2vh" textAlign="left" color="white" maxW={"80vh"}>
                {myMovie.description}
              </Text>
              <br />
              <Text fontSize="2vh" textAlign="left" color="white">
                Released: {myMovie.release_date}
              </Text>
              <br />
              <Text fontSize="2vh" textAlign="left" color="white">
                Duration: {myMovie.duration}
              </Text>
              <Box mt="3.5vh" mb="3vh">
                <Text
                  justify="left"
                  textAlign="left"
                  fontWeight="bold"
                  fontSize="2.5vh"
                  color="#d90429"
                >
                  Genres
                </Text>
                <Text
                  justify="left"
                  textAlign="left"
                  fontWeight="500"
                  fontSize="2.3vh"
                  color="white"
                >
                  {myMovie.genres?.map((el) => el + ' ')}
                </Text>
              </Box>
              {
                  // USER PREMIUM CASE: 
                  user.subscription == 2 ?
                  <Box textAlign="left" mt="3vh">
                   <Button
                  onClick={() => setPlayerTrailer(true)}
                  borderRadius="3vh"
                  rightIcon={<Icon as={MdPlayArrow} boxSize={6} />}
                  mr="1.5vh"
                  bg="#7209b7"
                  color="white"
                  _hover={{
                    background: '#5e60ce',
                    color: 'white',
                  }}
                >
                  <Text mb="0.25vh">WATCH</Text>
                  </Button> <Button borderRadius="3vh" bg="#354f52" color="white">
                  MY LIST
                  </Button>
                  </Box> : null
              }
                  {
                  // USER FREE CASE: 
                  user.subscription == 1 ?
                  <Box textAlign="left" mt="3vh">
                    <Link href={`/payment/rent/movie/${myMovie.id}`}>
                   <Button
                 
                  borderRadius="3vh"
                  mr="1.5vh"
                  bg="#7209b7"
                  color="white"
                  _hover={{
                    background: '#5e60ce',
                    color: 'white',
                  }}
                    >
                 
                      
                      <Text mb="0.25vh">RENT</Text>
                      
                    </Button>
                    </Link><Button borderRadius="3vh" bg="#354f52" color="white">
                  MY LIST
                    </Button>
                    <Text mt="2vh"
                      fontSize="2.3vh"
                      color={"white"}> You can <Link
                      href="/payment"
                      color={"#72efdd"}><b>upgrade</b>
                    </Link>  your plan to watch any content.</Text>
                  </Box> : null
              }
              {
                  // USER GUEST CASE: 
                  user.subscription == null ?
                  <Box textAlign="left" mt="3vh">
                    <Text
                      fontSize="2.3vh"
                      color={"white"}>
                      <Link
                        href="/login"
                        color={"#72efdd"}><b>Log In</b>
                      </Link> or <Link
                        href="/register"
                        color={"#64dfdf"}>
                        <b>Register</b>
                      </Link> to watch this movie.</Text>
                  </Box> : null
                }
              <Text
                textAlign="left"
                fontWeight="500"
                fontSize="2.3vh"
                color="#ffd000"
                mt="3.5vh"
              >
                Rating: {Math.round(myMovie.rating * 100) / 100} || User
                reviews: {myMovie.user_reviews}{' '}
              </Text>
            </Container>
          </Flex>
        ) : (
          <Loader />
        )}
        <Footer />
      </Flex>
    );
  };

  if (error) {
    return <Error />;
  } else {
    return (
      <Flex direction="column">
        {playTrailer ? renderTrailer() : renderPage()}
      </Flex>
    );
  }
}
