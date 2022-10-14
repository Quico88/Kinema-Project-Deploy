import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
  } from '@chakra-ui/react';

  import { Link } from 'react-router-dom';
  
  export default function MainMovieMenu(props) {
    return (
      <Flex
        w={'full'}
        h={'50vh'}
        backgroundImage={
          props.poster
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
            <Text
              color={'white'}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
              {props.title}
            </Text>
            <Stack direction={'row'}>
              <Link to={`/home/movie_details/${props.id}`}>
                <Button
                  bg={'blue.400'}
                  rounded={'full'}
                  color={'white'}
                  _hover={{ bg: 'blue.500' }}>
                  Watch
                </Button>
              </Link>
              <Link to={`/home/movie_details/${props.id}`}>
                <Button
                  bg={'whiteAlpha.300'}
                  rounded={'full'}
                  color={'white'}
                  _hover={{ bg: 'whiteAlpha.500' }}>
                  More information
                </Button>
              </Link> 
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    );
  }