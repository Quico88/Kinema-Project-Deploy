/* eslint-disable */
import React from 'react';
import {
  Box,
  Image,
  FormControl,
  Text,
  Stack,
  FormLabel,
  Input,
  FormHelperText,
  Flex,
  useMediaQuery
} from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentCheckout.css';
import { useDispatch, useSelector } from 'react-redux';
import { rentVideo } from '../../../Redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import NavBarPayment from '../../NavBarPayment/NavBarPayment';
import logo from '../../../Assets/logoPayment.png';
import moment from 'moment';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../AuthContext/firebase';


const stripePromise = loadStripe(
  'pk_test_51LvQonFFC0gF7yTeuOEoxQ3wpBdRP5RTM4qfj3LBPhDG49fftecGaI3ixkwnaU5yKXDHiEIg4RW6mdoZGWM5GEs200MTQVMdhI'
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username, email, uid, rented } = useSelector((state) => state.user);
  const { movieDetail } = useSelector((state) => state);
  const { serieDetail } = useSelector((state) => state);
  const [isLargerThan960] = useMediaQuery('(min-width: 960px)');
  const [isLargerThan480] = useMediaQuery('(min-width: 480px)');

  const { pathname } = useLocation();
  const params = useParams();

  const type = pathname.split('/')[3];

  if (type === 'tv_show') {
    var { title, poster, genres, number_seasons, duration, rating } = serieDetail;
  } else {
    var { title, poster, genres, release_date, duration, rating } = movieDetail;
  }

  const now = new Date();
  const rentDuration = 3600 * 24 * 4 * 1000; // 4 days

  const rentedMovie = {
    id: Number(params.id),
    title,
    posterImg: poster,
    serie: type === 'tv_show' ? true : false,
    expirationDate: now.getTime() + rentDuration,
  };

  const [errors, setErrors] = useState({
    name: 'A name is required',
    surname: 'A surname is required',
  });

  const [input, setInput] = useState({
    name: '',
    surname: '',
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function validate(input) {
    let errors = {};
    let nameRegex = /^[a-zA-Z-_ ]{3,20}$/;
    if (!input.name) {
      errors.name = 'A name is required';
    } else if (!nameRegex.test(input.name)) {
      errors.name = 'Name is invalid';
    }
    if (!input.surname) {
      errors.surname = 'A surname is required';
    } else if (!nameRegex.test(input.surname)) {
      errors.surname = 'Surname is invalid';
    }

    return errors;
  }

  const updateRented = async (payload) => {
    const userRef = doc(firestore, 'users', uid);
    await updateDoc(userRef, {
      rented: [...rented, payload],
    });
  };

  const handleSubmit = async (e) => {
    if (errors.name || errors.surname) {
      e.preventDefault();
      toast.warn('The form is not properly complete.', {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });
    } else {
      e.preventDefault();
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
      if (!error) {
        const { id } = paymentMethod;
        const { data } = await axios.post(
          '/payment/rent',
          { id, username, email, title }
        );

        if (data.success) {
          toast.success(data.message, {
            position: "top-center",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
          dispatch(rentVideo(rentedMovie));
          await updateRented(rentedMovie);
          navigate(-1);
        } else {
          toast.error(data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            
            });
        }
      }
    }
  };

  return (
    <Box
      backgroundColor={'#1D1D1D'}
      backgroundImage={
        'linear-gradient(180deg, #0000008c 20%, #0000008c 100%), url(https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/12/14/5fd73c24bebce.jpeg)'
      }
      backgroundRepeat={'no-repeat'}
      backgroundSize={'cover'}
      height={isLargerThan960 ? '100vh' : null}
      width={isLargerThan960 ? "100vw" : null}
      pb="30px"
    >
      <NavBarPayment />
      <ToastContainer/>
      <Stack
        direction={isLargerThan960 ? "row" : "column"}
        
        spacing={4}
        display="flex"
        mt="10vh"
        justifyContent="center"
        alignItems={'center'}
      >
        <form onSubmit={handleSubmit}>
          <FormControl
            display="flex"
            justifyContent="center"
            alignItems={'center'}
          >
            <Stack
              direction={isLargerThan480 ? "row" : "column-reverse"}
              spacing={0}
              
            >
              <Box
                w={'24vw'}
                h="48vh"
                minW="300px"
                minH="430px"
                maxH="450px"
                pl="30px"
                bgColor={'white'}
                borderLeftRadius={isLargerThan480 ? "0.5vh" : null}
                borderBottomRadius={isLargerThan480 ? null : "0.5vh"}
                pr="30px"
                pt="3.5vh"
                mb={"30px"}
              >
                <FormLabel m={'0px'} p="0px">
                  Name
                </FormLabel>
                <Input
                  variant="flushed"
                  value={input.name}
                  name="name"
                  onChange={handleChange}
                  w="18vw"
                  h="3.5vh"
                  minW="200px"
                />
                {errors.name && (
                  <FormHelperText color={'red'}>{errors.name}</FormHelperText>
                )}
                <FormLabel m={'3vh 0px 0px 0px'} p="0px">
                  Surname
                </FormLabel>
                <Input
                  variant="flushed"
                  value={input.surname}
                  name="surname"
                  onChange={handleChange}
                  w="18vw"
                  h="3.5vh"
                  minW="200px"
                />
                {errors.surname && (
                  <FormHelperText color={'red'}>
                    {errors.surname}
                  </FormHelperText>
                )}
                <Stack direction="row" spacing={10} mb="5vh">
                  <Box>
                    <FormLabel m={'3vh 0px 0px 0px'} p="0px">
                      City
                    </FormLabel>
                    <Input variant="flushed" w="8vw" minW={"100px"}
                  h="3.5vh" />
                  </Box>
                  <Box>
                    <FormLabel m={'3vh 0px 0px 0px'}  p="0px">
                      Address
                    </FormLabel>
                    <Input variant="flushed" minW={"100px"} w="8vw"
                  h="3.5vh"  />
                  </Box>
                </Stack>
                <CardElement className="pcard" />
                {isLargerThan480 ? null :  <button className="btn-premium2">CONFIRM</button> } 
              </Box>
              
              <Box  w="16vw" h={isLargerThan480 ?"48vh" : "230px"} borderRightRadius={isLargerThan480 ? "0.5vh" : null} borderTopRadius={isLargerThan480 ? null : "0.5vh"} minW={isLargerThan480 ? "250px" : "300px"} minH={isLargerThan480? "430px" : null} maxH="450px" bg={'rgba(17, 173, 152, 0.3)'}
              backdropFilter={'blur(10px)'}>
                <Image src={logo} w={isLargerThan480 ?"70%" : "160px"} h={isLargerThan480 ? "50%" : "160px"} ml={isLargerThan480 ?"20%" : "25%"} ></Image>
                <Text align={'center'} justify={'center'} color="white">
                  Rent
                </Text>
                <Stack direction={'row'} align={'center'} justify={'center'}>
                  <Text fontSize={'2xl'} color="white">
                    $
                  </Text>
                  <Text fontSize={'4xl'} color="white" fontWeight={800}>
                    1.99
                  </Text>
                </Stack>
                <Flex align={'end'} justify={'center'} mt="3vh">
                 {isLargerThan480 ? <button className="btn-premium">CONFIRM</button> : null } 
                </Flex>
              </Box>
            </Stack>
          </FormControl>
        </form>
        <Stack
          backgroundColor={'white'}
          w="300px"
          h={'68vh'}
          minH="500px"
                 
          direction={"column"}
          spacing={4}
          display="flex"
          
          justifyContent="center"
          alignItems={'center'}
          borderRadius="0.5vh"
          
        >
          
            
              <Text fontSize={'2.5vh'} fontWeight="600" noOfLines={1}>
                Product detail:
              </Text>
              <Image
                mt="2.2vh"
                src={'https://image.tmdb.org/t/p/original/' + poster}
                w={'25vh'}
                h="35vh"
                borderRadius="0.5vh"
          ></Image>
              <Box pl="28px" pr="28px" >
              <Text mt="1.3vh" fontSize={'2h'} fontWeight="500" maxW={'30vh'}>
                <b>Genres:</b> {genres?.map((el) => el + ' ')}
              </Text>
              
              <Text mt="2vh">
                <b>Expiration date:</b> {moment(now.getTime()+345600000).format('MMMM Do YYYY')}
              </Text>
              {number_seasons ? <Text mt="2.2vh">
                <b>Seasons:</b> {number_seasons}
              </Text> : null }
              {duration ? 
              <Text mt="2vh">
                <b>Duration:</b> {duration}
              </Text>
              : ""}
              <Text mt="2vh">
                <b>Rating:</b> {Math.round(rating * 100) / 100}
            </Text>
            </Box>
            
          
        </Stack>
      </Stack>
    </Box>
  );
};

export default function PaymentCheckoutRent(props) {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <div>
          <div>
            <CheckoutForm props={props} />
          </div>
        </div>
      </div>
    </Elements>
  );
}
