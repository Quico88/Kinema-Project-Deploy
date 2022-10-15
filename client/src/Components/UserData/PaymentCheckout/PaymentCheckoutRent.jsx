import React from 'react';
import { Box, Button, Image, FormControl, Text, Link } from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Link as RouteLink } from 'react-router-dom';
import axios from 'axios';
// import img from '../../../Assets/logo3.png';
// import img2 from '../../../Assets/fondopayment2.jpg';

// TODO: CAMBIAR BOOTSTRAP POR CHAKRAUI
import 'bootswatch/dist/lux/bootstrap.min.css';

const stripePromise = loadStripe(
  'pk_test_51LrrgZJF8OdpthZQzjEA3gwPESBIW22v5gNBch6JZhhDgIhm0j25PoUQ0XzT0HQqUb1EwnzdO68oWfJK5pgrvVYl00TLD4bPSL'
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      const { data } = await axios.post('http://localhost:3001/payment/rent', {
        id,
        amount: 500,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {' '}
      <FormControl
        // onSubmit={() => handleSubmit()}
        // backgroundImage={img2}
        display="flex"
        height={'100vh'}
        width={'100vw'}
      >
        <button>PROBANDO</button>
        <Box
          marginTop={'20px'}
          justifyContent={'center'}
          align={'center'}
          spacing={4}
          objectFit="cover"
          height={'100'}
          width={'100vw'}
          display="flex"
          justify="center"
        >
          <Box
            spacing={4}
            background={'black'}
            height={'600px'}
            w={[300, 400, 500]}
            borderColor={'#0af1c5'}
            alignContent={'center'}
            borderWidth="2px"
          >
            <RouteLink to="/home">
              <Button
                background={'#0af1c5'}
                size="md"
                marginTop={'10px'}
                marginBottom={'20px'}
              >
                BACK
              </Button>
            </RouteLink>
            <Text fontSize="3xl" color={'#0af1c5'} align={'center'}>
              ENJOY YOUR SHOW
            </Text>
            <Box align={'center'}>
              <Image
                paddingTop={'15px'}
                align={'center'}
                // src={img}
                objectFit="cover"
                borderRadius="full"
                boxSize="300px"
                alt="Kinema Premium"
              />
            </Box>
            <Text
              align={'center'}
              fontSize="2xl"
              color={'#0af1c5'}
              background={'black'}
              size="sm"
            >
              Price: $1.99
            </Text>
            <Box
              backgroundColor={'white'}
              borderColor={'#0af1c5'}
              borderWidth="2px"
              marginLeft={'15%'}
              marginRight={'15%'}
              marginTop={'10px'}
              marginBottom={'10px'}
            >
              <CardElement />
            </Box>
            <Box align={'center'} paddingTop={'10px'}>
              <Button align={'center'} background={'#0af1c5'} size="md">
                RENT
              </Button>
              <button>hola</button>
            </Box>
          </Box>
        </Box>
      </FormControl>
    </form>
  );
};

export default function PaymentCheckoutRent() {
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
  );
}
