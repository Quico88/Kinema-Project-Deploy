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
  Checkbox,
  FormControl,
} from '@chakra-ui/react';
import Pricing from './Pricing';
import Footer from '../../Home/Chakra UI Components/Footer';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { useAuth } from '../../AuthContext/AuthContext';
import { useNavigate} from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(true);
  const [errorEm, setErrorEm] = useState(true);
  const [validName, setValidName] = useState(true)

  const [user, setUser] = useState({
    displayName: '',
    email: '',
    password: '',
  });

  const { signup, signupWithGoogle } = useAuth();

  function handleChange(e) {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(!user.displayName || user.displayName.trim() === "" ) {
        setValidName(false)
        return
      }else{
        setValidName(true)
      }
      await signup(user.email, user.password, user.displayName);
      navigate('/register/plan');
    } catch (error) {
      /* console.log(error.message.includes("already") ? true: false) */
      if(error.message.includes("already")){
        let errorEm = error.message
        setErrorEm(false)
      }else{
        setErrorEm(true)
      }
      if(error.message.includes("Password")){
        let errorEm = error.message
        setError(false);
      }else{
        setError(true)
      }
    }
  }

  async function handleGoogleSignin() {
    await signupWithGoogle();
    navigate('/register/plan');
  }

  return (
    <div>
    <Box
      position={'relative'}
      height={'100vh'}
      backgroundColor={'#1D1D1D'}
      backgroundImage={
        'linear-gradient(180deg, #0000008c 20%, #0000008c 100%), url(https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/12/14/5fd73c24bebce.jpeg)'
      }
      backgroundRepeat={'no-repeat'}
      backgroundSize={'cover'}
      >
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
          display="flex"
          alignItems={"center"}
        justifyContent="center"  
      >
       
        <Stack
          bg={'rgba(17, 173, 152, 0.3)'}
          backdropFilter={'blur(10px)'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
        >
          <Stack spacing={4}>
            <Heading
              color={'white'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            >
              Sign up
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Username"
                bg={'gray.100'}
                border={0}
                name="displayName"
                type="text"
                value={user.displayName}
                onChange={(e) => {
                  handleChange(e);
                }}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Center>{/* {error && <p>{error}</p>}  */}{!validName && <p>You need to add a username</p>} </Center>
              <FormControl>
                <Input
                  placeholder="example@email.com"
                  bg={'gray.100'}
                  border={0}
                  name="email"
                  id={1}
                  type="email"
                  value={user.email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  bg={'gray.100'}
                  border={0}
                  id={3}
                  autoComplete={'none'}
                  marginTop={'20px'}
                  name="password"
                  value={user.password}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                <Button
                  fontFamily={'heading'}
                  mt={8}
                  w={'full'}
                  bgGradient="linear(to-r, blue.400,cyan.400)"
                  color={'white'}
                  onClick={handleSubmit}
                  _hover={{
                    bgGradient: 'linear(to-r, blue.600,cyan.600)',
                    boxShadow: 'xl',
                  }}
                >
                  Sign Up
                </Button>

                <Center>{!errorEm && <p>Email already in use</p>} </Center>
                <Center>{!error && <p>Should have at least 6 characters</p>}</Center>
              </FormControl>
            </Stack>
            <Button
              w={'full'}
              maxW={'md'}
              variant={'outline'}
              backgroundColor={'white'}
              marginTop={'30px'}
              onClick={handleGoogleSignin}
              leftIcon={<FcGoogle />}
            >
              Sign up with Google
            </Button>
          </Box>
          <Stack
            direction={{ base: 'flex', sm: 'row' }}
            align={'start'}
            justify={'space-evenly'}
          >
            <Checkbox color={'white'}>Remember me</Checkbox>
            <Link color={'gray'}>Forgot password?</Link>
          </Stack>
          form
          <Stack
            direction={{ base: 'flex', sm: 'row' }}
            gap={1}
            justifyContent={'center'}
          >
            <Text color={'white'}>Are you already registered? </Text>
              <Link  href='/login'  color={'gray'}>Log in</Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
      <Footer/>
    </div>
  );
}
