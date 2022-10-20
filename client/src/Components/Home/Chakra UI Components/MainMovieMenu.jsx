import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MainMovieMenu(props) {
  const userData = useSelector((state) => state.user);

  return (
    <Flex
      w={'full'}
      h={'50vh'}
      backgroundImage={props.poster}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
    >
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
      >
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
          <Text
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}
          >
            {props.title}
          </Text>
          <Stack direction={'row'}>
            {userData.subscription === 2 ? (
              <Link to={`/home/movie_details/${props.id}`}>
                <Button
                  bg={'blue.400'}
                  rounded={'full'}
                  color={'white'}
                  _hover={{ bg: 'blue.500' }}
                >
                  Watch
                </Button>
              </Link>
            ) : userData.subscription === 1 ? (
              <Link to={`/payment/rent/movie/${props.id}`}>
                <Button
                  bg={'blue.400'}
                  rounded={'full'}
                  color={'white'}
                  _hover={{ bg: 'blue.500' }}
                >
                  Rent
                </Button>
              </Link>
            ) : (
              <Link to={`/login`}>
                <Button
                  bg={'blue.400'}
                  rounded={'full'}
                  color={'white'}
                  _hover={{ bg: 'blue.500' }}
                >
                  Log In to Watch
                </Button>
              </Link>
            )}

            <Link to={`/home/movie_details/${props.id}`}>
              <Button
                bg={'whiteAlpha.300'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'whiteAlpha.500' }}
              >

                More Information

              </Button>
            </Link>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
