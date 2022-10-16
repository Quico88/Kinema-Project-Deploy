import React from "react";
import { Box, Button, Image, FormControl, Text } from '@chakra-ui/react'
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import {Link as RouteLink } from "react-router-dom";
import axios from "axios"
import img from "../../../Assets/premiumiconkine.png"
import img2 from "../../../Assets/fondopayment2.jpg"

const stripePromise = loadStripe("pk_test_51LrrgZJF8OdpthZQzjEA3gwPESBIW22v5gNBch6JZhhDgIhm0j25PoUQ0XzT0HQqUb1EwnzdO68oWfJK5pgrvVYl00TLD4bPSL")

const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
      
    const handleSubmit = async (e) => {
        e.preventDefault()
   
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
        })
    if(!error){
        
        const {id} = paymentMethod
        const {data} = await axios.post("http://localhost:3001/payment/premium",{id,
    amount: 5000
    })
    }
    }

    return (
        <form onSubmit={handleSubmit} className="form-background">
        <FormControl backgroundImage={img2} display='flex' height={"100vh"} width={"100vw"} > 
        <Box marginTop={"20px"}justifyContent={"center"} align={"center"} spacing={4}  objectFit='cover' height={"100"} width={"100vw"} display='flex' justify='center'  
            >           
          <Box spacing={4} background={"#1a1a24"}height={"600px"} w={[300, 400, 500]} borderColor={"#a56317"} alignContent={"center"}
            borderWidth='2px' >

            <RouteLink to={'/home'}>
                <Button background={"#a56317"} size='md' marginTop={"10px"} >BACK</Button>
            </RouteLink>
            <Text fontSize='3xl' color={"#a56317"} align={"center"}>BE PREMIUM</Text>
            <Box align={"center"}>
            <Image align={"center"} src={img} objectFit='cover' borderRadius='full' boxSize='350px' alt='Kinema Premium' />
            </Box>
            <Text  align={"center"} fontSize='2xl' color={"#a56317"} background={"#1a1a24"} size='sm' >Price: $7.99 / Month</Text>
            <Box backgroundColor={"white"} 
            borderColor={"#a56317"} 
            borderWidth='2px' 
            marginLeft={"15%"} 
            marginRight={"15%"} 
            marginTop={"10px"}
            marginBottom={"10px"}
            >
                <CardElement
                />         
            </Box>
            <Box align={"center"} paddingTop={"10px"}>
            <button className="btn-premium">CONFIRM</button>
            </Box>
          </Box>
          </Box>
          </FormControl>
          </form>
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
