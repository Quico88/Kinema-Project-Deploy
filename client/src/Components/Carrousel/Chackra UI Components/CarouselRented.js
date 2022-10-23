import React from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Text,
  Image,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

// Settings for the slider
const settings = {
  dots: false,
  arrows: false,
  fade: false,
  infinite: false,
  speed: 1500,
  slidesToShow: 8,
  slidesToScroll: 4,
};

export default function CarouselWatchList({ movies }) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  // These are the images used in the slide

  const cards = movies;

  return (
    <Box
      position={cards.length > 8 ? 'relative' : 'static'}
      height={'390px'}
      width={cards.length < 8 ? `${cards.length * 12.5}%` : 'full'}
      mt={20}
      mb={20}
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
      <Text
        fontSize={{ base: '1xl', md: '3xl' }}
        fontWeight={'bold'}
        color={'white'}
      >
        Rented :
      </Text>
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
        display={cards.length < 8 ? 'none' : 'inline-flex'}
        backgroundColor={'transparent'}
        _hover={{
          backgroundColor: 'transparent',
        }}
        _active={{
          backgroundColor: 'transparent',
        }}
      >
        <IoIosArrowBack color="white" size={85} />
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
        display={cards.length < 8 ? 'none' : 'inline-flex'}
        backgroundColor={'transparent'}
        _hover={{
          backgroundColor: 'transparent',
        }}
        _active={{
          backgroundColor: 'transparent',
        }}
      >
        <IoIosArrowForward color="white" size={85} />
      </IconButton>
      {/* Slider */}
      <Slider
        {...settings}
        ref={(slider) => setSlider(slider)}
        slidesToShow={cards.length < 8 ? cards.length : 8}
      >
        {cards.map((m, index) => {
          if (m.serie) {
            return (
              <Box key={index} height={'6xl'}>
                <Link to={`/home/tv_show_details/${m.id}`}>
                  <Image
                    src={
                      m.posterImg.includes('https://image.tmdb.org/')
                        ? m.posterImg
                        : 'https://image.tmdb.org/t/p/w300' + m.posterImg
                    }
                    alt={m.title}
                    _hover={{
                      transform: 'scale(1.10)',
                      transition: '0.7s',
                      shadow: '5px 5px 50px black',
                      zIndex: '400',
                    }}
                  />
                </Link>
              </Box>
            );
          } else {
            return (
              <Box key={index} height={'6xl'} zIndex={20}>
                <Link to={`/home/movie_details/${m.id}`}>
                  <Image
                    src={
                      m.posterImg.includes('https://image.tmdb.org/')
                        ? m.posterImg
                        : 'https://image.tmdb.org/t/p/w300' + m.posterImg
                    }
                    transition="0.4s"
                    _hover={{
                      transform: 'scale(1.10)',
                      transition: '0.7s',
                      shadow: '5px 5px 50px black',
                      zIndex: '400',
                    }}
                    alt={m.title}
                  />
                </Link>
              </Box>
            );
          }
        })}
      </Slider>
    </Box>
  );
}