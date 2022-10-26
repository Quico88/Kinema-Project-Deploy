/* eslint-disable */
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

export default function Pricing({
  planType,
  price,
  firstFeature,
  secondFeature,
  thirdFeature,
}) {
  return (
    <Center py={6}>
      <Box
        maxW={'420px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        backgroundColor={'rgba(17, 173, 152, 0.3)'}
        backdropFilter={'blur(10px)'}
      >
        <Stack
          textAlign={'center'}
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}
        >
          <Text
            fontSize={'sm'}
            fontWeight={600}
            bg={useColorModeValue('green.50', 'green.900')}
            p={2}
            px={3}
            color={'green.700'}
            rounded={'full'}
          >
            {planType}
          </Text>
          <Stack direction={'row'} align={'center'} justify={'center'}>
            <Text fontSize={'3xl'} color="white">
              $
            </Text>
            <Text fontSize={'6xl'} fontWeight={800} color="white">
              {price}
            </Text>
            <Text color={'gray.300'}>/month</Text>
          </Stack>
        </Stack>

        <Box
          bg={useColorModeValue('rgba(17, 173, 152, 0.2)', 'gray.900')}
          px={6}
          py={5}
          color="white"
        >
          <List spacing={3}>
            <ListItem key={2}>
              <ListIcon as={CheckIcon} color="green.400" />
              Read and leave comments on any content
            </ListItem>
            <ListItem key={3}>
              <ListIcon as={CheckIcon} color="green.400" />
              Search for information of all available content
            </ListItem>
            <ListItem key={1}>
              <ListIcon as={CheckIcon} color="green.400" />
              {firstFeature}
            </ListItem>
            {secondFeature ? (
              <ListItem key={4}>
                <ListIcon as={CheckIcon} color="green.400" />
                {secondFeature}
              </ListItem>
            ) : null}
            {thirdFeature ? (
              <ListItem key={4}>
                <ListIcon as={CheckIcon} color="green.400" />
                {thirdFeature}
              </ListItem>
            ) : null}
          </List>
          <Box align={'center'} color="blackAlpha.800">
            {planType == 'Premium' ? (
              <Link href="/payment">
                <Button ml="1.5vh" mt="2vh">
                  Subscribe to premium
                </Button>
              </Link>
            ) : (
              <Link href="/home">
                <Button ml="2.7vh" mt="2vh">
                  Subscribe to basic
                </Button>{' '}
              </Link>
            )}
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
