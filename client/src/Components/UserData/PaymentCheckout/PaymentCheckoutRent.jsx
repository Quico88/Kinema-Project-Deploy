import React from 'react';
import { Box, Button, Image, FormControl, Text, Stack, FormLabel, Input, FormHelperText, Flex} from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Link as RouteLink, useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from '../../../Assets/logo3.png';
import "./PaymentCheckout.css"
import { useDispatch, useSelector } from "react-redux";
import { rentVideo } from '../../../Redux/actions';

import { useState } from 'react';
import { useEffect } from 'react';
import NavBarPayment from '../../NavBarPayment/NavBarPayment';
import logo from "../../../Assets/logo.png"
import { getMovieDetail } from '../../../Redux/actions';
import { getSerieDetail } from '../../../Redux/actions';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../AuthContext/firebase';


const stripePromise = loadStripe(
  'pk_test_51LrrgZJF8OdpthZQzjEA3gwPESBIW22v5gNBch6JZhhDgIhm0j25PoUQ0XzT0HQqUb1EwnzdO68oWfJK5pgrvVYl00TLD4bPSL'
);

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { username, email, uid, rented } = useSelector(state => state.user)
    const { movieDetail } = useSelector(state => state);
    const { serieDetail } = useSelector(state => state);

    const { pathname } = useLocation();
    const params = useParams();

    const type = pathname.split('/')[3];
    
    useEffect(() => {
        if (type === 'movie') {
           
            dispatch(getMovieDetail(params.id));
            
        }
        else if (type === 'tv_show') {
            
            dispatch(getSerieDetail(params.id));  
       }
    }, [dispatch]);
        const myMovie = useSelector((state) => state.movieDetail);
    const mySerie = useSelector((state) => state.serieDetail);
    console.log(mySerie)
    
    
    const [errors, setErrors] = useState({
        name: "A name is required",
        surname:"A surname is required",
        });
        const [input, setInput] = useState({
          name: "",
          surname: "",
      });
      function handleChange(e) {
        setInput({
          ...input,
          [e.target.name] : e.target.value
        })
        setErrors(validate({
          ...input,
          [e.target.name] : e.target.value
        }))
      };  
      function validate(input) {
        let errors = {};
        let nameRegex = /^[a-zA-Z-_ ]{3,20}$/;
        if (!input.name) {
          errors.name = "A name is required"
        }
        else if (!nameRegex.test(input.name)) {
          errors.name = "Name is invalid";
        }
        if (!input.surname) {
          errors.surname = "A surname is required";
        } 
        else if (!nameRegex.test(input.surname)) {
          errors.surname = "Surname is invalid";
        }
        
        return errors;
        
      };
    

    if ( type === 'tv_show' ){
        var { title, poster } = serieDetail;
    }
    else{
        var { title, poster } = movieDetail;
    }
        
    const now = new Date();
    const rentDuration = 3600 * 24 * 4 * 1000; // 4 days 

    const updateRented = async (payload) => {
        const userRef = doc(firestore, 'users', uid);
        await updateDoc(userRef, {
            rented: [...rented, payload ]
        })
    }
  
    const rentedMovie = {
        id: Number(params.id),
        title,
        posterImg: poster,
        serie: type === 'tv_show' ? true : false,
        expirationDate: now.getTime() + rentDuration
    }

    const handleSubmit = async (e) => {

        if (errors.name || errors.surname) {
            e.preventDefault()
            alert("Please complete the form correctly")
        }
        else {
            e.preventDefault();
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });
            if (!error) {
                const { id } = paymentMethod;
                const { data } = await axios.post('http://localhost:3001/payment/rent', { id, username, email });
                
                if(data.success){
                    alert(data.message);
                    dispatch(rentVideo(rentedMovie));  
                    await updateRented(rentedMovie);
                    navigate(-1); 
                }
                else { alert(data.message) };

            }
        }
        
    };
    

    return (
        <Box backgroundColor={'#1D1D1D'}
        backgroundImage={
       'linear-gradient(180deg, #0000008c 20%, #0000008c 100%), url(https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/12/14/5fd73c24bebce.jpeg)'
        }
        backgroundRepeat={'no-repeat'}
        backgroundSize={'cover'}
        height={"100vh"}>
            <NavBarPayment />
            <Stack direction='row' spacing={4} display='flex' mt="10vh" justifyContent="center" alignItems={"center"}>
     <form onSubmit={handleSubmit}>
     <FormControl   display='flex'  justifyContent="center" alignItems={"center"}    >
       <Stack direction='row' spacing={4}  bg={'rgba(17, 173, 152, 0.3)'}
       backdropFilter={'blur(10px)'}  borderRadius="0.5vh"  w={"80vh"}>
           <Box w={"44vh"} h="50vh" pl="5vh" bgColor={"white"}  borderLeftRadius="0.5vh" pr="2vh" mr="2vh" pt="3.5vh">
           <FormLabel  m={"0px"} p="0px" >Name</FormLabel>
             <Input variant='flushed' value={input.name} name="name" onChange={handleChange} />
             {errors.name && <FormHelperText color={"red"}>
               {errors.name}
                </FormHelperText>}
           <FormLabel  m={"5vh 0px 0px 0px"} p="0px">Surname</FormLabel>
             <Input variant='flushed' value={input.surname} name="surname" onChange={handleChange} />
             {errors.surname && <FormHelperText color={"red"}>
               {errors.surname}
                </FormHelperText>}
             <Stack direction='row' spacing={4} mb="5vh" >
               <Box >
                 <FormLabel  m={"5vh 0px 0px 0px"}  p="0px"  >City</FormLabel>
                 <Input   variant='flushed'  />
               </Box>
           <Box >
           <FormLabel  m={"5vh 0px 0px 0px"} p="0px"  >Address</FormLabel>
            <Input   variant='flushed' />
            </Box>
          
        </Stack>
             <CardElement className="pcard"
             />     
           </Box>
           


         <Box >
           <Image src={logo} w={"30vh"} ></Image>
           <Text align={'center'} justify={'center'} color="white">Rent</Text>
           <Stack direction={'row'} align={'center'} justify={'center'}>
           <Text fontSize={'2xl'} color="white">$</Text>
           <Text fontSize={'4xl'} color="white" fontWeight={800}>
             1.99
           </Text>
            
           </Stack>
           <Flex  align={'end'} justify={'center'} mt="3vh">
           <button className="btn-premium">CONFIRM</button>
           </Flex>
           
         
         </Box>
       </Stack>

     </FormControl>
                </form>
                <Box backgroundColor={"white"} w="35vh" h={"68vh"} display={"flex"} alignItems="center" justifyContent="center" borderRadius="0.5vh">
                    {type === 'movie' ?
                        <Box  alignItems={"center"}  >
                            
                            <Box m="3vh">
                            <Text fontSize={"2.5vh"} fontWeight="600" noOfLines={1}> Product detail: </Text>
                            <Image mt="2.2vh" src={'https://image.tmdb.org/t/p/original/'+myMovie.poster} w={"25vh"} h="35vh"  borderRadius="0.5vh"></Image>
                            <Text mt="2.2vh" fontSize={"2h"} fontWeight="500" maxW={"20vh"} > <b>Genres:</b>  {myMovie.genres?.map((el) => el + ' ')}</Text> 
                            <Text mt="2.2vh"><b>Released:</b>  {myMovie.release_date} </Text>
                            <Text mt="2.2vh"><b>Duration:</b>  {myMovie.duration} </Text>
                            <Text mt="2.2vh"><b>Rating:</b> {Math.round(myMovie.rating * 100) / 100} </Text>
                            </Box>
                       


                        </Box>
                        : <Box display="flex" alignItems={"center"}  alignContent="center" >
                            <Box m="3vh" >
                        <Text fontSize={"2.5vh"} fontWeight="600" noOfLines={1} > Product detail: </Text>
                        <Image mt="2.2vh"  src={'https://image.tmdb.org/t/p/original/'+mySerie.poster} w={"25vh"} h="35vh" borderRadius="0.5vh"></Image>
                            <Text mt="2.2vh" fontSize={"2h"} fontWeight="500" maxW={"20vh"}  > <b>Genres:</b>  {mySerie.genres?.map((el) => el + ' ')}</Text> 
                            <Text mt="2.2vh"><b>Released:</b>  {mySerie.release_date_first_episode} </Text>
                            <Text mt="2.2vh"><b>Seasons:</b>  {mySerie.number_seasons} </Text>
                                <Text mt="2.2vh"><b>Rating:</b> {Math.round(mySerie.rating * 100) / 100} </Text>
                                </Box>
                        </Box>
                        
                        }
            </Box>
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
                <CheckoutForm props={props}/>
            </div>
            </div>
        </div>
        </Elements>
    );
}
