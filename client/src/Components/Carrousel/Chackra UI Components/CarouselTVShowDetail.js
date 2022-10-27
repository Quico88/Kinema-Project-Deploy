import React from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Text,
  Image,
  Link,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { useSelector } from 'react-redux';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 4,
};

export default function CarouselTvShow({ openPlayer, movies, videoSerie }) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState(null);
  const user = useSelector((state) => state.user);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '35%' });
  const side = useBreakpointValue({ base: '30%', md: '0px' });

  // These are the images used in the slide
  const cards = movies;

  return (
    <Box
      position={'relative'}
      height={'270px'}
      width={'105%'}
      overflow={'hidden'}
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
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <IoIosArrowBack />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <IoIosArrowForward />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((m, index) => {
          if (m.episode_number) {
            return (
              <Box
                maxW={'260px'}
                key={index}
                m={'5vh'}
                mt="1vh"
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

                  <Text color={'white'} noOfLines={3} fontSize="1.2vh">
                    {m.overview}
                  </Text>
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
