import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams} from 'react-router-dom';
import { getSerieDetail, clearSerieDetail, getSeasonDetail } from "../../../Redux/actions";
import { Box , Flex, Heading, Text, Container, Button, Menu, MenuItem, MenuButton,  MenuList, Select} from "@chakra-ui/react"
import { Icon } from '@chakra-ui/react'
import { MdPlayArrow } from 'react-icons/md'
import Simple from "../../NavBar/NavBar";
import Footer from "../../Home/Chakra UI Components/Footer";
import Carrousel from "../../Carrousel/Carrousel";



export default function TVShowDetail() {
    const dispatch = useDispatch();
    let { id } = useParams();
    
    useEffect(() => {
        dispatch(clearSerieDetail());
      dispatch(getSerieDetail(id));
      dispatch(getSeasonDetail(id, 1));
    }, [dispatch])
    
  function handleSeason(e) {
    e.preventDefault();
    dispatch(getSeasonDetail(id, e.target.value));
  }
  
  const mySerie = useSelector(state => state.serieDetail);
  const mySeason = useSelector(state => state.seasonDetail);
  let totalSeasons = [];
  if (mySerie.number_seasons >= 1) {
    for (let i = 1; i <= mySerie.number_seasons; i++){
      totalSeasons.push("Season " + [i]);
    }
  }
  console.log(mySeason);

    return (
        <div>
        <Simple/>
    {
        mySerie.title ?
        <Flex
            w={'full'}
            h={'85vh'}
            backgroundImage={
                mySerie.back_poster
            }
            backgroundSize={'cover'}
            backgroundPosition={'center center'}
            boxShadow='320px 0px 128px 64px black inset'
            justify="left">
                <Container maxW='full' ms="none" ml="10vh" mt="3vh" >
                    <Heading m="2vh" size='3xl' textAlign="left" noOfLines={2} color="white" fontWeight="bold">{mySerie.title}</Heading>
                    <Text fontSize='2vh' textAlign="left" color="white" maxW="80vh" noOfLines={4}> {mySerie.description} </Text>
                    <Box mt="3.5vh" mb="3vh">
                        <Text justify="left" textAlign="left" fontWeight="bold" fontSize="2.5vh" color="#d90429">Genres</Text>
                        <Text justify="left" textAlign="left" fontWeight="500" fontSize="2.3vh" color="white">{mySerie.genres?.map(el => el + (" "))}</Text>
                    </Box>	
                    <Box textAlign="left" mt="3vh">
                        <a href={mySerie.trailer}>
                            <Button borderRadius='3vh' rightIcon={<Icon as={MdPlayArrow} boxSize={6} />} mr="1.5vh" bg='#7209b7' color="white"
                                _hover={{
                            background: "#5e60ce",
                            color: "white",
                                  }}>
                                    <Text mb="0.25vh">WATCH</Text>
                            </Button>
                        </a>
                    <Button borderRadius='3vh' bg="#354f52" color="white" mr="1.5vh">MY LIST</Button>
                    <Select borderRadius='1.5vh' onChange={e=> handleSeason(e)} bg="#233d4d" w="15vh" color="white" mt="2vh">
                      {
                        totalSeasons?.map((el, index) => {
                          return (
                            <option value={index + 1} style={{ backgroundColor: "#233d4d" }} > {el} </option>
                          );
                        })
                      }
                    </Select>
                  
            </Box>
                <Text textAlign="left" fontWeight="500" fontSize="2.3vh" color="#ffd000" mt="2.5vh">Rating: {Math.round(mySerie.rating * 100) / 100} || User reviews: {mySerie.user_reviews} </Text>
                {
          mySeason.id? <Carrousel movies={mySeason.episodes} videoSerie={mySerie.trailer}></Carrousel> : null
        }
        </Container>
            </Flex> : <h1>Loading</h1>
        }	
        
        <Footer/>
    </div>
)
    
}