import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getSerieDetail,
  clearSerieDetail,
  getSeasonDetail,
  getCommentsData,
  postNewComment,
  addToWatchlist,
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
  Divider,
  Center,
  Textarea,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { MdPlayArrow } from 'react-icons/md';
import { BsCreditCard } from 'react-icons/bs';
import NavBar from '../../NavBar/NavBar';
import NavBarPlayer from '../../NavBarPlayer/NavBarPlayer';
import Comment from '../Comment/Comment';
import Footer from '../../Home/Chakra UI Components/Footer';
import CarouselTvShow from '../../Carrousel/Chackra UI Components/CarouselTVShowDetail';
import Loader from '../../Loader/LoaderDetails.jsx';
import Error from '../../Error/Error.jsx';
import { color } from '../../globalStyles';
import { useToast } from '@chakra-ui/react';
import StarRatings from 'react-star-ratings';
import { FiPlusCircle } from 'react-icons/fi';
import moment from 'moment';

export default function TVShowDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const comments = useSelector((state) => state.comments);
  const [playTrailer, setPlayerTrailer] = useState(false);
  const error = useSelector((state) => state.error);
  const user = useSelector((state) => state.user);
  const [commentArea, setCommentArea] = useState('');
  const [errorCommentArea, setErrorCommentArea] = useState(false);
  const [random, refresh] = useState('');
  const toast = useToast();

  useEffect(() => {
    dispatch(clearSerieDetail());
    dispatch(getSerieDetail(id));
    dispatch(getSeasonDetail(id, 1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCommentsData(id));
  }, [random]);

  function handleSeason(e) {
    e.preventDefault();
    dispatch(getSeasonDetail(id, e.target.value));
  }

  const handleTextArea = (e) => {
    e.preventDefault();
    setCommentArea(e.target.value);
    setErrorCommentArea(validate(e.target.value));
  };

  const handleAddToWatchlist = (id) => {
    if (user.watchList.find((e) => e.id === id)) {
      toast({
        title: 'This serie is already in your watchlist.',
        status: 'info',
        duration: 2000,
        position: 'top-center',
        isClosable: true,
      });
    } else {
      dispatch(addToWatchlist(mySerie, user));
      toast({
        title: 'Added to watchlist',
        description: 'You can see it in your profile and home.',
        status: 'success',
        duration: 2000,
        position: 'top-center',
        isClosable: true,
      });
    }
  };

  const handleSubmitComment = (e) => {
    if (!commentArea) {
      e.preventDefault();
      setErrorCommentArea(true);
    } else {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let currentDate = `${day}-${month}-${year}`;
      dispatch(postNewComment(user.uid, commentArea, currentDate, mySerie.id));
      refresh(Math.random());
      setCommentArea('');
    }
  };

  const validate = (str) => {
    if (str.length < 5) {
      return true;
    } else return false;
  };

  const mySerie = useSelector((state) => state.serieDetail);
  const mySeason = useSelector((state) => state.seasonDetail);
  let totalSeasons = [];
  if (mySerie.number_seasons >= 1) {
    for (let i = 1; i <= mySerie.number_seasons; i++) {
      totalSeasons.push('Season ' + [i]);
    }
  }

  const validExpirationDate = () => {
    const { rented } = user;
    if (!rented.length) return false;
    const movieRentHistory = rented.filter ( m => m.id == id);
    let now = new Date();
    if (!movieRentHistory.length) return false;
    const validMovie = (movieRentHistory.find ( (m) => m.expirationDate > now.getTime())) 
    return validMovie.expirationDate;
  }

  const openPlayer = () => setPlayerTrailer(true);
  const closePlayer = () => setPlayerTrailer(false);

  const renderTrailer = () => {
    const idTrailer = mySerie.trailer.slice(32);
    return (
      <>
        <NavBarPlayer closePlayer={closePlayer} />
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
        {mySerie.title ? (
          <Box>
            <Flex
              as="main"
              mt={16}
              w={'100%'}
              h={'85vh'}
              backgroundImage={
                mySerie.back_poster.includes('https://image.tmdb.org')
                  ? mySerie.back_poster
                  : 'https://image.tmdb.org/t/p/original/' + mySerie.back_poster
              }
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
                <Box>
                  <Text
                    fontSize="2vh"
                    textAlign="left"
                    color="white"
                    fontWeight="bold"
                    display="inline"
                  >
                    Rating:{' '}
                  </Text>
                  <StarRatings
                    rating={Math.floor(mySerie.rating / 2)}
                    starRatedColor="gold"
                    starHoverColor="gold"
                    starDimension={'2vh'}
                    starSpacing={'0.5vh'}
                    numberOfStars={5}
                    name="rating"
                  />
                  <Text
                    fontSize="2vh"
                    textAlign="left"
                    color="white"
                    display="inline"
                  >
                    {`  (${Math.round(mySerie.rating * 10) / 10 / 2}/5)`} ||
                    <Text
                      fontSize="2vh"
                      textAlign="left"
                      color="white"
                      fontWeight="bold"
                      display="inline"
                    >
                      {' '}
                      User reviews:{' '}
                    </Text>
                    {mySerie.user_reviews
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </Box>
                <br />
                <Text
                  fontSize="2vh"
                  textAlign="left"
                  color="white"
                  fontWeight="bold"
                  display="inline"
                >
                  Released:{' '}
                </Text>
                <Text
                  fontSize="2vh"
                  textAlign="left"
                  color="white"
                  display="inline"
                >
                  {mySerie.release_date_first_episode}.
                </Text>
                <br />
                <br />
                <Text
                  fontSize="2vh"
                  textAlign="left"
                  color="white"
                  maxW="80vh"
                  fontWeight="bold"
                  noOfLines={4}
                >
                  Genres:{' '}
                  {mySerie.genres?.map((genre) => (
                    <Button
                      key={genre.id}
                      size="sm"
                      variant="outline"
                      mr="1vh"
                      mb="1vh"
                      pointerEvents="none"
                    >
                      {genre}
                    </Button>
                  ))}
                </Text>
                <br />
                <Text
                  fontSize="2vh"
                  color="white"
                  maxW="80vh"
                  noOfLines={4}
                  textAlign="justify"
                >
                  {mySerie.description}
                </Text>
                {
                  //  USER PREMIUM CASE:
                  user.subscription === 2 ? (
                    <Box textAlign="left" mt="3vh">
                      <Button
                        onClick={() => openPlayer()}
                        borderRadius="3vh"
                        rightIcon={<Icon as={MdPlayArrow} boxSize={6} />}
                        bg={'blue.400'}
                        rounded={'full'}
                        color={'white'}
                        mr="2vh"
                        _hover={{ bg: 'blue.500' }}
                      >
                        <Text mb="0.25vh">Watch</Text>
                      </Button>
                      <Button
                        onClick={() => handleAddToWatchlist(mySerie.id)}
                        bg={'whiteAlpha.300'}
                        rounded={'full'}
                        color={'white'}
                        rightIcon={<Icon as={FiPlusCircle} boxSize={6}/>}
                        _hover={{ bg: 'whiteAlpha.500' }}
                      >
                        My List
                      </Button>
                    </Box>
                  ) : null
                }
                {
                  //  USER FREE CASE:
                  user.subscription === 1 ? (
                    <Box textAlign="left" mt="3vh">
                      {validExpirationDate()?
                        <Button
                          onClick={() => openPlayer()}
                          borderRadius="3vh"
                          mr="2vh"
                          rightIcon={<Icon as={MdPlayArrow} boxSize={6} />}
                          bg={'blue.400'}
                          rounded={'full'}
                          color={'white'}
                          _hover={{ bg: 'blue.500' }}
                        >
                          <Text mb="0.25vh">Watch</Text>
                        </Button>
                        :
                        <Button
                          bg={'blue.400'}
                          mr="2vh"
                          rightIcon={<Icon as={BsCreditCard} boxSize={6} />}
                          onClick={() => navigate(`/payment/rent/tv_show/${id}`)}
                          rounded={'full'}
                          color={'white'}
                          _hover={{ bg: 'blue.500' }}
                        >
                          <Text mb="0.25vh">Rent</Text>
                        </Button>
                      }
                      <Button
                        onClick={() =>
                          toast({
                            title: `Upgrade your account to add to your list.`,
                            status: 'info',
                            position: 'top-right',
                            isClosable: true,
                            duration: 3000,
                          })
                        }
                        bg={'whiteAlpha.300'}
                        rounded={'full'}
                        color={'white'}
                        rightIcon={<Icon as={FiPlusCircle} boxSize={6}/>}
                        _hover={{ bg: 'whiteAlpha.500' }}
                      >
                        My List
                      </Button>
                      {validExpirationDate() ?
                        <Text mt="2vh" color={'white'}>You have until {moment(validExpirationDate()).format('MMMM Do YYYY, h:mm a')} to watch this content.</Text>
                        : null
                      }
                      <Text mt="2vh" fontSize="2.3vh" color={'white'}>
                        You can&nbsp;
                        <Link href="/payment" color={'#72efdd'}>
                          <b>upgrade</b>
                        </Link>
                        &nbsp;your plan to watch any content.
                      </Text>
                    </Box>
                  ) : null
                }
                {
                  //  USER GUEST CASE:
                  user.subscription == null ? (
                    <Box textAlign="left" mt="1vh">
                      <Text fontSize="2.3vh" color={'white'} mt="2vh">
                        <Link href="/login" color={'#72efdd'}>
                          <b>Log In </b>
                        </Link>
                        or
                        <Link href="/register" color={'#64dfdf'}>
                          <b> Register </b>
                        </Link>
                        to watch this serie.
                      </Text>
                      <br />
                    </Box>
                  ) : null
                }
                <br />
                <Select
                  focusBorderColor="#233d4d"
                  onChange={(e) => handleSeason(e)}
                  bg="#233d4d"
                  maxW="15vh"
                  display={'inline-block'}
                  color="white"
                  mt="0vh"
                  mr="1vh"
                  cursor="pointer"
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
                {mySeason.id ? (
                  <CarouselTvShow
                    openPlayer = {openPlayer}
                    movies={mySeason.episodes}
                    videoSerie={mySerie.trailer}
                  ></CarouselTvShow>
                ) : null}
              </Container>
            </Flex>
            <Flex flexDirection="column" ml="10vh" mt={100} mb={50}>
              <Box w="50%" borderBottom="1px" borderColor="gray.800" mb={5}>
                <Text color="gray.200" fontSize={30}>
                  Comments
                </Text>
              </Box>

              <Flex
                maxH={500}
                overflow="auto"
                flexDirection="column"
                alignItems="center"
                w="50%"
                css={{
                  '&::-webkit-scrollbar': {
                    backgroundColor: 'black',
                    width: '10px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '1px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: color.kinemaBg,
                    borderRadius: '24px',
                  },
                }}
              >
                {comments.length ? (
                  comments.map((comment) => {
                    return (
                      <Comment
                        username={comment.username}
                        text={comment.content}
                        avatar={comment.avatar}
                        date={comment.date}
                        userId={comment.userId}
                        id={comment._id}
                        refresh={refresh}
                      ></Comment>
                    );
                  })
                ) : (
                  <Center
                    border="2px"
                    borderColor="gray.800"
                    backgroundColor={color.kinemaBg}
                    color="gray.100"
                    w="100%"
                    borderRadius={0}
                  >
                    <Text mt="2vh" mb="2vh" fontSize="2vh">
                      No comments yet. Be the first one!
                    </Text>
                  </Center>
                )}
              </Flex>

              <Box
                border="2px"
                borderColor="gray.800"
                backgroundColor={color.kinemaBg}
                color="gray.100"
                w="50%"
                borderRadius={0}
              >
                <Text fontSize={20} ml={7} mt={5}>
                  Leave your comment!
                </Text>
                <Divider mt={4} mb={4} />
                {user ? (
                  <>
                    <Center>
                      <Textarea
                        value={commentArea}
                        placeholder="Type something here..."
                        w="90%"
                        border="2px"
                        borderColor="gray.300"
                        mb={5}
                        onChange={handleTextArea}
                      />
                    </Center>
                    <Flex justifyContent="flex-end">
                      {errorCommentArea ? (
                        <Text mr={5} color="red">
                          You must write at least 5 letters
                        </Text>
                      ) : (
                        <></>
                      )}
                      <Button
                        mr="5%"
                        mb={5}
                        backgroundColor={color.kinemaBg}
                        borderRadius={0}
                        _hover={{ backgroundColor: 'gray.600' }}
                        onClick={handleSubmitComment}
                        disabled={errorCommentArea}
                      >
                        Submit
                      </Button>
                    </Flex>
                  </>
                ) : (
                  <Center fontSize={15} mb={10} mt={10}>
                    <Button
                      onClick={() => {
                        navigate('/login');
                      }}
                      fontSize={20}
                      backgroundColor={color.kinemaBg}
                      mr={5}
                      _hover={{ backgroundColor: 'gray.600' }}
                    >
                      Log In
                    </Button>
                    <Text>Or</Text>
                    <Button
                      onClick={() => {
                        navigate('/register');
                      }}
                      fontSize={20}
                      backgroundColor={color.kinemaBg}
                      ml={5}
                      _hover={{ backgroundColor: 'gray.600' }}
                    >
                      Register
                    </Button>
                  </Center>
                )}
              </Box>
            </Flex>
          </Box>
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
