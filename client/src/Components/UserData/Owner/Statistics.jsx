import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { ReactNode } from 'react';
  import { BsPerson } from 'react-icons/bs';
  import { FiServer } from 'react-icons/fi';
  import { GoLocation } from 'react-icons/go';

  
  export default function Statistics({totalUsers, premiumUsers, basicUsers}) {


    


    return (
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          fontWeight={'bold'}>
          Our company is expanding, you could be too.
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                <Stat
                px={{ base: 2, md: 4 }}
                py={'5'}
                shadow={'xl'}
                border={'1px solid'}
                borderColor={useColorModeValue('gray.800', 'gray.500')}
                rounded={'lg'}>
                    <Flex justifyContent={'space-between'}>
                        <Box pl={{ base: 2, md: 4 }}>
                            <StatLabel  color={"blue.600"} fontWeight={'medium'} isTruncated>
                                Total Users
                            </StatLabel>
                            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                                 {totalUsers}
                            </StatNumber>
                        </Box>
                        <Box
                        my={'auto'}
                        color={useColorModeValue('gray.800', 'gray.200')}
                        alignContent={'center'}>
                        <BsPerson size={'3em'} />
                        </Box>
                    </Flex>
                </Stat>
                <Stat
                px={{ base: 2, md: 4 }}
                py={'5'}
                shadow={'xl'}
                border={'1px solid'}
                borderColor={useColorModeValue('gray.800', 'gray.500')}
                rounded={'lg'}>
                    <Flex justifyContent={'space-between'}>
                        <Box pl={{ base: 2, md: 4 }}>
                            <StatLabel  color={"yellow.500"} fontWeight={'medium'} isTruncated>
                                Premium Users
                            </StatLabel>
                            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                                {premiumUsers}
                            </StatNumber>
                        </Box>
                        <Box
                        my={'auto'}
                        color={useColorModeValue('gray.800', 'gray.200')}
                        alignContent={'center'}>
                        <BsPerson size={'3em'} />
                        </Box>
                    </Flex>
                </Stat>
                <Stat
                px={{ base: 2, md: 4 }}
                py={'5'}
                shadow={'xl'}
                border={'1px solid'}
                borderColor={useColorModeValue('gray.800', 'gray.500')}
                rounded={'lg'}>
                    <Flex justifyContent={'space-between'}>
                        <Box pl={{ base: 2, md: 4 }}>
                            <StatLabel  color={"green.600"} fontWeight={'medium'} isTruncated>
                                Basic Users
                            </StatLabel>
                            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                                {basicUsers}
                            </StatNumber>
                        </Box>
                        <Box
                        my={'auto'}
                        color={useColorModeValue('gray.800', 'gray.200')}
                        alignContent={'center'}>
                        <BsPerson size={'3em'} />
                        </Box>
                    </Flex>
                </Stat>
        </SimpleGrid>

        
    {/* <Center margin={"20px"}>
      <Button color={ "black" } onClick={prevPage} backgroundColor="lightgray" >Prev</Button>
        <label  style={{"marginLeft": "20px", "marginRight": "20px", "color": "black"}} ><Button>{page}</Button> de  {totalPaginas}</label>
      <Button color={ "black" } onClick={nextPage} backgroundColor="lightgray" >Next</Button>
      </Center> */}

      
      {/*  <Center margin={"20px"} paddingBottom={"20px"} >
      <Button color={ "black" } onClick={prevPage} backgroundColor="lightgray" >Prev</Button>
        <label  style={{"marginLeft": "20px", "marginRight": "20px", "color": "black"}} ><Button>{page}</Button> de  {totalPaginas}</label>
      <Button color={ "black" } onClick={nextPage} backgroundColor="lightgray" >Next</Button>
      </Center> */}
      </Box>
    );
  }