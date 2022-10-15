 import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { clearMovieDetail, getMovieDetail } from '../../../Redux/actions';
import { Box, Flex, Heading, Text, Container, Button } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { MdPlayArrow } from 'react-icons/md';
import Footer from '../../Home/Chakra UI Components/Footer.jsx';
import NavBar from '../../NavBar/NavBar.jsx';

export default function MovieDetail(props) {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(clearMovieDetail());
    dispatch(getMovieDetail(id));
  }, [dispatch]);

  const myMovie = useSelector((state) => state.movieDetail);
  return (
    <div>
      <Flex as="header" position="fixed" w="100%" zIndex={200}>
                <NavBar/>
      </Flex>
      {myMovie.title ? (
        <Flex
          w={'full'}
          h={'85vh'}
          backgroundImage={myMovie.back_poster}
          backgroundSize={'cover'}
          backgroundPosition={'center center'}
          boxShadow="240px 0px 128px 64px black inset"
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
            <Text fontSize="2vh" textAlign="left" color="white">
              {' '}
              {myMovie.description}{' '}
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
            <Box textAlign="left" mt="3vh">
              <a href={myMovie.trailer}>
                <Button
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
              </a>
              <Button borderRadius="3vh" bg="#354f52" color="white">
                MY LIST
              </Button>
            </Box>
            <Text
              textAlign="left"
              fontWeight="500"
              fontSize="2.3vh"
              color="#ffd000"
              mt="3.5vh"
            >
              Rating: {Math.round(myMovie.rating * 100) / 100} || User reviews:{' '}
              {myMovie.user_reviews}{' '}
            </Text>
          </Container>
        </Flex>
      ) : (
        <h1>Loading</h1>
      )}
      <Footer />
    </div>
  );
}
