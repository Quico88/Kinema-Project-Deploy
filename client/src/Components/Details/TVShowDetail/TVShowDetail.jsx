import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getSerieDetail,
  clearSerieDetail,
  getSeasonDetail,
} from '../../../Redux/actions';
import {
  Box,
  Flex,
  Heading,
  Text,
  Container,
  Button,
  Link,
  Select,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { MdPlayArrow } from 'react-icons/md';
import NavBar from '../../NavBar/NavBar';
import NavBarPlayer from '../../NavBarPlayer/NavBarPlayer'
import Footer from '../../Home/Chakra UI Components/Footer';
import CarouselTvShow from '../../Carrousel/Chackra UI Components/CarouselTVShowDetail';
import Loader from '../../Loader/LoaderDetails.jsx';
import Error from '../../Error/Error.jsx';


export default function TVShowDetail() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [playTrailer, setPlayerTrailer] = useState(false);
  const error = useSelector((state) => state.error);
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(clearSerieDetail());
    dispatch(getSerieDetail(id));
    dispatch(getSeasonDetail(id, 1));
  }, [dispatch]);

  function handleSeason(e) {
    e.preventDefault();
    dispatch(getSeasonDetail(id, e.target.value));
  }

  const mySerie = useSelector((state) => state.serieDetail);
  const mySeason = useSelector((state) => state.seasonDetail);
  let totalSeasons = [];
  if (mySerie.number_seasons >= 1) {
    for (let i = 1; i <= mySerie.number_seasons; i++) {
      totalSeasons.push('Season ' + [i]);
    }
  }
  
  const closePlayer = () => setPlayerTrailer(false);

  const renderTrailer = () => {
    const idTrailer = mySerie.trailer.slice(32);
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
  }

  const renderPage = () => {
    return (
      <Flex direction="column">
        <Flex as="header" position="fixed" w="100%" zIndex={200}>
          <NavBar />
        </Flex>
        {mySerie.title ? (
          <Flex
            as="main"
            mt={16}
            w={'100%'}
            h={'85vh'}
            backgroundImage={mySerie.back_poster.includes('https://image.tmdb.org') ? mySerie.back_poster : 'https://image.tmdb.org/t/p/original/'+mySerie.back_poster}
            backgroundSize={'cover'}
            backgroundPosition={'center center'}
            boxShadow="70vh 0px 128px 64px black inset"
            justify="left"
          >
            <Container maxW="90%" ms="none" ml="10vh" mt="3vh">
              <Heading
                mb="1.5vh"
                size="3xl"
                textAlign="left"
                noOfLines={2}
                color="white"
                fontWeight="bold"
              >
                {mySerie.title}
              </Heading>
              <Text
                fontSize="2vh"
                textAlign="left"
                color="white"
                maxW="80vh"
                noOfLines={4}
              >
                {mySerie.description}
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
                  {mySerie.genres?.map((el) => el + ' ')}
                </Text>
              </Box>
              {//  USER PREMIUM CASE:
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
              </Button>
            <Button
              borderRadius="3vh"
              bg="#354f52"
              color="white"
              mr="1.5vh"
            >
              MY LIST
            </Button>
            <Select
              borderRadius="3vh"
              focusBorderColor="#233d4d"
              onChange={(e) => handleSeason(e)}
              bg="#233d4d"
              w="15vh"
              display={"inline-block"}
              color="white"
              mt="2vh"
            >
              {totalSeasons?.map((el, index) => {
                return (
                  <option
                    value={index + 1}
                    style={{ backgroundColor: '#233d4d' }}
                  >
                    {el}
                  </option>
                );
              })}
            </Select>
                  </Box> : null}
               {//  USER FREE CASE:
                user.subscription == 1 ?
               <Box textAlign="left" mt="3vh">
                    <Link href={`/payment/rent/tv_show/${id}`}>
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
                      </Link>
              <Button
                borderRadius="3vh"
                bg="#354f52"
                color="white"
                mr="1.5vh"
              >
                MY LIST
              </Button>
              <Select
                borderRadius="3vh"
                focusBorderColor="#233d4d"
                onChange={(e) => handleSeason(e)}
                bg="#233d4d"
                      maxW="15vh"
                      display={"inline-block"}
                color="white"
                      mt="2vh"
                      mr="1vh"
              >
                {totalSeasons?.map((el, index) => {
                  return (
                    <option
                      value={index + 1}
                      style={{ backgroundColor: '#233d4d' }}
                    >
                      {el}
                    </option>
                  );
                })}
                    </Select>
                    <Text mt="2vh"
                      fontSize="2.3vh"
                      color={"white"}> You can <Link
                      href="/payment"
                      color={"#72efdd"}><b>upgrade</b>
                    </Link>  your plan to watch any content.</Text>
                  </Box> : null}
               {//  USER FREE CASE:
                user.subscription == null ?
                <Box textAlign="left" mt="1vh">
                  
               <Select
                 borderRadius="3vh"
                 focusBorderColor="#233d4d"
                 onChange={(e) => handleSeason(e)}
                 bg="#233d4d"
                       maxW="15vh"
                       display={"inline-block"}
                 color="white"
                       mt="0vh"
                       mr="1vh"
               >
                 {totalSeasons?.map((el, index) => {
                   return (
                     <option
                       value={index + 1}
                       style={{ backgroundColor: '#233d4d' }}
                     >
                       {el}
                     </option>
                   );
                 })}
                    </Select>
                    <Text
                      fontSize="2.3vh"
                      color={"white"}
                      mt="2vh">
                      <Link
                        href="/login"
                        color={"#72efdd"}><b>Log In</b>
                      </Link> or <Link
                        href="/register"
                        color={"#64dfdf"}>
                        <b>Register</b>
                      </Link> to watch this serie.</Text>
                   </Box> : null}
              
             
              <Text
                textAlign="left"
                fontWeight="500"
                fontSize="2.3vh"
                color="#ffd000"
                mt="2.5vh"
              >
                Rating: {Math.round(mySerie.rating * 100) / 100} || User
                reviews:
                {mySerie.user_reviews}
              </Text>
              {mySeason.id ? (
                <CarouselTvShow
                  movies={mySeason.episodes}
                  videoSerie={mySerie.trailer}
                ></CarouselTvShow>
              ) : null}
            </Container>
          </Flex>
        ) : (
          <Loader />
        )}
        <Footer />
      </Flex>
    );
  }

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

