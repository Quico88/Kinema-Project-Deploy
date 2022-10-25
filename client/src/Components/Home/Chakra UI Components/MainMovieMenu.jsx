import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMovieDetail } from '../../../Redux/actions';
import { Icon } from '@chakra-ui/react';
import { BsCreditCard } from 'react-icons/bs';
import { IoMdInformationCircleOutline } from 'react-icons/io';


export default function MainMovieMenu(props) {
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(getMovieDetail(props.id));
    };

    const validExpirationDate = () => {
        const { rented } = userData;
        if (!rented.length) return false;
        const movieRentHistory = rented.filter ( m => m.id == props.id);
        let now = new Date();
        if (!movieRentHistory.length) return false;
        const validMovie = (movieRentHistory.find ( (m) => m.expirationDate > now.getTime())) 
        return validMovie.expirationDate;
    }

    return (
        <Flex
            w={'full'}
            h={'65vh'}
            backgroundImage={props.poster}
            backgroundSize={'cover'}
            backgroundPosition={'center center'}
        >
        <VStack
            w={'full'}
            justify={'center'}
            px={useBreakpointValue({ base: 4, md: 8 })}
            bgGradient={
            'linear(to-b,  rgba(34,34,34,0.2721463585434174) 86%, rgba(34,34,34,0.8715861344537815) 94%, rgba(34,34,34,1) 100%)'
            }
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
                <Stack direction={'row'} spacing={4} alignSelf={'center'}>
                    {userData.subscription === 2 || (userData.subscription === 1 && validExpirationDate()) ? (
                    <Link to={`/home/watch/${props.id}`}>
                        <Button
                            onClick={() => handleClick()}
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
                                onClick={() => handleClick()}
                                rightIcon={<Icon as={BsCreditCard} boxSize={6} />}
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
                            rightIcon={<Icon as={IoMdInformationCircleOutline} boxSize={6} />}
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
