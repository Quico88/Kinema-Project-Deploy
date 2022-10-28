import { 
  Box,
  Image,
  FormControl,
  Text,
  FormLabel,
  Input,
  FormHelperText,
  Stack,
  Flex
} from '@chakra-ui/react'
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../AuthContext/firebase';
import { useState } from "react";
import axios from "axios"
import { useSelector } from "react-redux";
import logo from "../../../Assets/logo.png"
import { useDispatch } from "react-redux";
import NavBarPayment from "../../NavBarPayment/NavBarPayment";
import { changeSID, upgradePlan } from "../../../Redux/actions";
import { ToastContainer, toast } from 'react-toastify';


const stripePromise = loadStripe("pk_test_51LvQonFFC0gF7yTeuOEoxQ3wpBdRP5RTM4qfj3LBPhDG49fftecGaI3ixkwnaU5yKXDHiEIg4RW6mdoZGWM5GEs200MTQVMdhI")

const CheckoutForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stripe = useStripe()
    const elements = useElements()
  const { username, email, uid } = useSelector(state => state.user);

    
    const [errors, setErrors] = useState({
    name: "Please fill name.",
    surname:"Please fill surname.",
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
      errors.name = "Please fill name."
    }
    else if (!nameRegex.test(input.name)) {
      errors.name = "Name is invalid.";
    }
    if (!input.surname) {
      errors.surname = "Please fill surname.";
    } 
    else if (!nameRegex.test(input.surname)) {
      errors.surname = "Surname is invalid.";
    }
    
    return errors;
    
  };

  const upgratePlanFire = async () => {
    const userRef = doc(firestore, `/users/${uid}`);
    await updateDoc(userRef, {
      subscription: 2,
    });
  }

  const handleSubmit = async (e) => {
    if (errors.name || errors.surname) {
      e.preventDefault()
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
    }
    else {
      try {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        if(!error){
            const {id} = paymentMethod
            const {data} = await axios.post("/payment/premium",{id, username, email })
          if (data.success) {
                const userRef = doc(firestore, `/users/${uid}`);
                await updateDoc(userRef, {
                stripeId: data.subId,
                });
                dispatch(changeSID(data.subId))
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
                await upgratePlanFire();
                dispatch(upgradePlan());
                navigate('/home'); 
            }
          else {
            
            toast.error(data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
              
              }); }
        }
    }
    catch (e){ alert(e) }    
}
    }
        

    return (
      <Box backgroundColor={'#1D1D1D'}
           backgroundImage={
          'linear-gradient(180deg, #0000008c 20%, #0000008c 100%), url(https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/12/14/5fd73c24bebce.jpeg)'
           }
           backgroundRepeat={'no-repeat'}
           backgroundSize={'cover'}
           height={"100vh"}>
        <NavBarPayment />
        <ToastContainer/>
        <form onSubmit={handleSubmit}>
        <FormControl   display='flex'  justifyContent="center" alignItems={"center"} mt="18vh"   >
           <Stack direction='row' spacing={4}  bg={'rgba(17, 173, 152, 0.3)'}
          backdropFilter={'blur(10px)'}  borderRadius="0.5vh"  w={"80vh"}>
              <Box w={"44vh"} h="50vh" pl="5vh" bgColor={"white"}  borderLeftRadius="0.5vh" pr="2vh" mr="2vh" pt="3.5vh">
              <FormLabel  m={"0px"} p="0px" >Name</FormLabel>
                <Input variant='flushed' name="name" value={input.name}  onChange={handleChange} />
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
              <Text align={'center'} justify={'center'} color="white">Be premium</Text>
              <Stack direction={'row'} align={'center'} justify={'center'}>
              <Text fontSize={'2xl'} color="white">$</Text>
              <Text fontSize={'4xl'} color="white" fontWeight={800}>
                7.99
              </Text>
                <Text color={'gray.500'}>/month</Text>
              </Stack>
                <Flex align={'end'} justify={'center'} mt="3vh">
                <button className="btn-premium">CONFIRM</button>
              </Flex>
              
              
            
            </Box>

          </Stack> 
        </FormControl>
        </form>
       
        
          </Box>
    )
}

export default function PaymentCheckout() {
    return (
        <Elements stripe={stripePromise}>
            <div>
                <div>
                    <div>
                        <CheckoutForm />
                    </div>
                </div>
            </div>
        </Elements>
    )
}
