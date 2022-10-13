/* import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
  } from '@chakra-ui/react';
  
  export default function Login() {
    return (
      <Stack minH={'100vh'}  direction={{ base: 'column', md: 'row' }}>
        <Flex flex={1} >
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://themorninroutine.files.wordpress.com/2021/11/diseno-sin-titulo-2021-11-24t190003.675.png'
            }
            backgroundSize={"cover"}
            backgroundPosition={"right"}
          />
        </Flex>
        <Flex p={8} flex={1} align={'center'}  justify={'center'} padding={"none"}>
          <Stack spacing={4} w={'60%'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Sign in to your account</Heading>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.500'}>Forgot password?</Link>
              </Stack>
              <Button colorScheme={'blue'} variant={'solid'}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Flex>
        
      </Stack>
    );
  } */

  import {
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    Avatar,
    AvatarGroup,
    useBreakpointValue,
    Center,
    Link,
    FormControl,
    Checkbox,
    /* Icon, */
  } from '@chakra-ui/react';
  import { FcGoogle } from 'react-icons/fc';
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useAuth } from '../../AuthContext/AuthContext';
  import axios from "axios"
 

  
  export default function Login() {

    const navigate = useNavigate();
  const [error, setError] = useState()

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const {login, loginWithGoogle} = useAuth()

  function handleChange(e) {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function postUser(info){
    let sendUser = await axios.post("http://localhost:3001/users", info)

    return sendUser
}


    function handleChange(e) {
        e.preventDefault();
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }



    async function handleSubmit(e){
      e.preventDefault()
      try {
        await login(user.email, user.password)
      navigate("/profile")
        
      } catch (error) {
        setError(error.message)
      }
    }

    async function handleGoogleSignin(){
      await loginWithGoogle()
      navigate("/profile")
    }

    return (
      <Box position={'relative'} 
            height={"100vh"}
            backgroundImage={"linear-gradient(180deg, #0000008c 20%, #0000008c 100%), url(https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/12/14/5fd73c24bebce.jpeg)"}
            backgroundRepeat={"no-repeat"} 
            backgroundSize={"cover"} >
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}>
          <Stack spacing={{ base: 10, md: 20 }}>
            {/* <Heading
              lineHeight={1.1}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
              Logueate
              
            </Heading>
            <Stack direction={'row'} spacing={4} align={'center'}>
              <AvatarGroup>
                {avatars.map((avatar) => (
                  <Avatar
                    key={avatar.name}
                    name={avatar.name}
                    src={avatar.url}
                    position={'relative'}
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: 'full',
                      height: 'full',
                      rounded: 'full',
                      transform: 'scale(1.125)',
                      bgGradient: 'linear(to-bl, red.400,pink.400)',
                      position: 'absolute',
                      zIndex: -1,
                      top: 0,
                      left: 0,
                    }}
                  />
                ))}
              </AvatarGroup>
              <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
                +
              </Text>
              <Flex
                align={'center'}
                justify={'center'}
                fontFamily={'heading'}
                fontSize={{ base: 'sm', md: 'lg' }}
                bg={'gray.800'}
                color={'white'}
                rounded={'full'}
                minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
                minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
                position={'relative'}
                _before={{
                  content: '""',
                  width: 'full',
                  height: 'full',
                  rounded: 'full',
                  transform: 'scale(1.125)',
                  bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                  position: 'absolute',
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}>
                YOU
              </Flex>
            </Stack> */}
          </Stack>
          <Stack
            bg={'rgba(17, 173, 152, 0.3)'}
            backdropFilter={"blur(10px)"}
           /*  opacity={".9"} */
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}>
            <Stack spacing={4}>
              <Heading
                color={'white'}
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                Log in
                <Text
                  as={'span'}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text">
                  !
                </Text>
              </Heading>
             {/*  <Text color={'white'} fontSize={{ base: 'sm', sm: 'md' }}>
                We’re looking for amazing engineers just like you! Become a part
                of our rockstar engineering team and skyrocket your career!
              </Text> */}
            </Stack>
            <Box as={'form'} mt={10}>
              <Stack spacing={4}>
               {/*  <Input
                  placeholder="Username"
                  bg={'gray.100'}
                  border={0}
                  name="username" 
                  type="text"
                  value={input.username}
                  onChange={(e) => {
                    handleChange(e)
                }}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                /> */}
               <FormControl /* onSubmit={() => handleSubmit() }  */>
              <Input
                placeholder="Your Email"
                bg={"gray.100"}
                border={0}
                name="email"
                type="email"
                value={user.email}
                onChange={(e) => {
                  handleChange(e);
                }}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                placeholder="Your Password"
                type="password"
                bg={"gray.100"}
                border={0}
                marginTop={"30px"}
                name="password"
                value={user.password}
                onChange={(e) => {
                  handleChange(e);
                }}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
            <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, blue.400,cyan.400)"
              color={"white"}
              onClick={handleSubmit}
              _hover={{
                bgGradient: "linear(to-r, blue.600,cyan.600)",
                boxShadow: "xl",
              }}
            >
              Log in
            </Button>

            <Center>{error && <p>{error}</p> } </Center>
              </FormControl>
              </Stack>
              {/* <Button
                fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r, blue.400,cyan.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, blue.600,cyan.600)',
                  boxShadow: 'xl',
                }}>
                Log In
              </Button> */}
              <Button
        w={'full'}
        maxW={'md'}
        variant={'outline'}
        backgroundColor={"white"}
        marginTop={"20px"}
        onClick={handleGoogleSignin}
        leftIcon={<FcGoogle />}>
        <Center>
          <Text>Log in with Google</Text>
        </Center>
      </Button>
            </Box>
            <Stack
              direction={{ base: 'flex', sm: 'row' }}
              align={'start'}
              justify={'space-evenly'}>
              <Checkbox color={'white'}>Remember me</Checkbox>
              <Link color={'blue'}>Forgot password?</Link>
            </Stack>
            form
            <Stack direction={{ base: 'flex', sm: 'row' }}   gap={1} justifyContent={"center"} >
            
          <Text color={"white"}  >¿First Time in KINEMA? </Text>
          <Link color={'blue'}  >Sign up</Link>
        
        </Stack>
          </Stack>
        </Container>
        {/* <Blur
          position={'absolute'}
          top={-10}
          left={-10}
          style={{ filter: 'blur(70px)' }}
          zIndex={-1}
        /> */}
      </Box>
    );
  }
  
  /* export const Blur = (props) => {
    return (
      <Icon
        width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
        zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
        height="560px"
        viewBox="0 0 528 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <circle cx="71" cy="61" r="111" fill="#F56565" />
        <circle cx="244" cy="106" r="139" fill="#ED64A6" />
        <circle cy="291" r="139" fill="#ED64A6" />
        <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
        <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
        <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
        <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
      </Icon>
    );
  }; */