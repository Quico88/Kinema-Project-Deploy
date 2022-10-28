import React from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Text,
  Image,
  Link,
} from '@chakra-ui/react';
import { useMediaQuery } from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import './Carrousel.css'

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 6,
  responsive: [{
    breakpoint: 2000,
    settings: {
      slidesToShow: 6,
      slidesToScroll: 6,
    }
  },{
    breakpoint: 1800,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 5,
    }
  },{
    breakpoint: 1500,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: true,
    }
  },
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: true,
      dots: false
    }
  },
  {
    breakpoint: 820,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: true,
      dots: false
    }
  },
  {
    breakpoint: 420,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      arrows: true,
      dots: false
    }
  },]
};

export default function CarouselTvShow({ openPlayer, movies, videoSerie }) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState(null);
  const user = useSelector((state) => state.user);
  const [isShortThan800px] = useMediaQuery("(max-width: 800px)");
  const [isShortThan420px] = useMediaQuery("(max-width: 420px)");

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const buttonSize = useBreakpointValue({base:40, md:60, lg:80})
  const top = useBreakpointValue({ base: '90%', md: '35%' });
  const side = useBreakpointValue({ base: '30%', md: '0px' });

  // These are the images used in the slide
  const cards = movies;

  return (
    <Box
      position={'relative'}
      height={'270px'}
      w="105%"
      pr="5vw"
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((m, index) => {
          if (m.episode_number) {
            return (
              <Box
                maxW={'240px'}
                key={index}
                m={'2vh'}
                mt="1vh"
                /* mr="10vw" */
                transition="0.4s"
                _hover={{
                  transform: 'scale(1.07)',
                  transition: '0.8s',
                }}
              >

                <Link
                  onClick={() => openPlayer()}
                  position="relative"
                  w={'250px'}
                  pointerEvents={!user || user.subscription === 1 ? 'none' : ''}

                >
                  <Box maxW={isShortThan800px ? "30vw" : "20vw"}>
                    <Image src={m.image} borderRadius="0.5vh"></Image>

                    {m.duration ? (
                      <Text color={'white'} fontWeight="600">
                        {' '}
                        {m.episode_number}.{m.name} ({m.duration} min){' '}
                      </Text>
                    ) : (
                      <Text color={'white'} fontWeight="600">
                        {' '}
                        {m.episode_number}.{m.name}
                      </Text>
                    )}

                    {isShortThan420px ? <></> :
                      <Text color={'white'} noOfLines={3} fontSize="1.2vh">
                        {m.overview}
                      </Text>
                    }
                  </Box>
                </Link>
              </Box>
            );
          }
          return null
        })}
      </Slider>
    </Box>
  );
}
