  import {
    Box,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    Center,
    Link,
    FormControl,
    Checkbox,
  } from '@chakra-ui/react';
  import { FcGoogle } from 'react-icons/fc';
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useAuth } from '../../AuthContext/AuthContext';
  
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
          </Stack>
          <Stack
            bg={'rgba(17, 173, 152, 0.3)'}
            backdropFilter={"blur(10px)"}
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
            </Stack>
            <Box as={'form'} mt={10}>
              <Stack spacing={4}> 
               <FormControl >
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
      </Box>
    );
  }
 
