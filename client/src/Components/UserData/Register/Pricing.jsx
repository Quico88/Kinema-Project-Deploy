import {
    Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    Link,
    useColorModeValue,
} from '@chakra-ui/react';
  
  import { CheckIcon } from '@chakra-ui/icons';
  
  export default function Pricing({planType, price, firstFeature, secondFeature, thirdFeature}) {
    return (
      <Center py={6}>
        <Box
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'} >
          
          <Stack
            textAlign={'center'}
            p={6}
            color={useColorModeValue('gray.800', 'white')}
            align={'center'}>
            <Text
              fontSize={'sm'}
              fontWeight={500}
              bg={useColorModeValue('green.50', 'green.900')}
              p={2}
              px={3}
              color={'green.500'}
              rounded={'full'}>
               {planType}
            </Text>
            <Stack direction={'row'} align={'center'} justify={'center'}>
              <Text fontSize={'3xl'}>$</Text>
              <Text fontSize={'6xl'} fontWeight={800}>
                {price}
              </Text>
              <Text color={'gray.500'}>/month</Text>
            </Stack>
          </Stack>
  
          <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={5} >
            <List spacing={3} >
              <ListItem key={1} >
                <ListIcon as={CheckIcon} color="green.400" />
                {firstFeature}
              </ListItem>
              <ListItem key={2}>
                <ListIcon as={CheckIcon} color="green.400" />
                50 automation executions
              </ListItem>
              <ListItem key={3} >
                <ListIcon as={CheckIcon} color="green.400" />
                50 identified users
              </ListItem>
              {
              thirdFeature ? <ListItem key={4} >

              <ListIcon as={CheckIcon} color="green.400" />
                  {thirdFeature}
                  
                </ListItem>
                  : null
              }
            </List>
            {planType == "Premium" ? <Link  href='/payment'><Button ml="1.5vh" mt="2vh">Subscribe to premium</Button></Link>  :  <Link href='/home'><Button ml="2.7vh" mt="2vh">Subscribe to basic</Button> </Link>}
        </Box>
            
          </Box>
              
      </Center>
    );
  }