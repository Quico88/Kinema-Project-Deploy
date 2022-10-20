import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { clearMovieDetail, getCommentsData, getMovieDetail, postNewComment } from "../../../Redux/actions";
import {
  Box,
  Flex,
  Heading,
  Text,
  Container,
  Button,
  Center,
  Textarea,
  Divider,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { MdPlayArrow } from "react-icons/md";
import Footer from "../../Home/Chakra UI Components/Footer.jsx";
import NavBar from "../../NavBar/NavBar.jsx";
import { useState } from "react";
import "./MovieDetail.css";
import NavBarPlayer from "../../NavBarPlayer/NavBarPlayer";
import Loader from "../../Loader/LoaderDetails.jsx";
import Error from "../../Error/Error.jsx";
import {color} from '../../globalStyles'

export default function MovieDetail() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [ playTrailer, setPlayerTrailer ] = useState(false);
  const error = useSelector((state) => state.error);
  const user = useSelector((state) => state.user);
  const [ commentArea, setCommentArea ] = useState('');
  const [ errorCommentArea, setErrorCommentArea ] = useState(false)

  useEffect(() => {
    dispatch(clearMovieDetail());
    dispatch(getMovieDetail(id));
  }, [dispatch]);

  const myMovie = useSelector((state) => state.movieDetail);

  const handleTextArea = (e) => {
    e.preventDefault()
    setCommentArea(e.target.value)
    setErrorCommentArea(validate(e.target.value))
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if(!commentArea){
      setErrorCommentArea(true)
    } else {
      /* dispatch(postNewComment(user.uid)) */
    }
  }

  const validate = (str) => {
    if(str.length<5){
      return true
    } else return false
  }

  const closePlayer = () => setPlayerTrailer(false);

  const renderTrailer = () => {
    const idTrailer = myMovie.trailer.slice(32);
    return (
      <>
        <NavBarPlayer closePlayer={closePlayer} />
        <iframe
          height={"100%"}
          width={"100%"}
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
          <Box>
            <Flex
              as="main"
              mt={16}
              w={"full"}
              h={"85vh"}
              backgroundImage={myMovie.back_poster}
              backgroundSize={"cover"}
              backgroundPosition={"center center"}
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
                    {myMovie.genres?.map((el) => el + " ")}
                  </Text>
                </Box>
                <Box textAlign="left" mt="3vh">
                  <Button
                    onClick={() => setPlayerTrailer(true)}
                    borderRadius="3vh"
                    rightIcon={<Icon as={MdPlayArrow} boxSize={6} />}
                    mr="1.5vh"
                    bg="#7209b7"
                    color="white"
                    _hover={{
                      background: "#5e60ce",
                      color: "white",
                    }}
                  >
                    <Text mb="0.25vh">WATCH</Text>
                  </Button>
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
                  Rating: {Math.round(myMovie.rating * 100) / 100} || User
                  reviews: {myMovie.user_reviews}{" "}
                </Text>
              </Container>
            </Flex>
   
            <Flex flexDirection="column" mt={100} mb={50}>
              <Box w="50%" borderBottom="1px" borderColor="gray.800" mb={5}>
                <Text color="gray.200" fontSize={30}>Comments</Text>
              </Box>
              <Flex
                maxH={500}
                overflow="auto"
                flexDirection="column"
                alignItems="center"
                w="50%"
                css={{
                  '&::-webkit-scrollbar': {
                    backgroundColor: "black",
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
                
              </Flex>

              <Box
                border="1px"
                borderColor="gray.800"
                backgroundColor={color.kinemaBg}
                color="gray.200"
                w="50%"
                borderRadius={0}
              >
                <Text fontSize={20} ml={7} mt={5}>
                  Leave your comment!
                </Text>
                <Divider mt={4} mb={4} />
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
                  {errorCommentArea ? <Text mr={5} color="red" >You must write at least 5 letters</Text> : <></>}
                  <Button
                    mr="5%"
                    mb={5}
                    backgroundColor={color.kinemaBg}
                    borderRadius={0}
                    _hover={{ backgroundColor: "gray.600" }}
                    onClick={handleSubmitComment}
                    disabled={errorCommentArea}
                  >
                    Submit
                  </Button>
                </Flex>
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
