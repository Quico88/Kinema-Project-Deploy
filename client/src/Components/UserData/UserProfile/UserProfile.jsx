import { useAuth } from '../../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../AuthContext/firebase';
import {
  HStack,
  Divider,
  IconButton,
  useBreakpointValue,
  Image,
  VStack,
  Flex,
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
} from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';
import Slider from 'react-slick';
import logo from '../../../Assets/logo.png';

const settings = {
  dots: true,
  arrows: false,
  fade: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 4,
};

export default function UserProfile() {
  const navigate = useNavigate();
  const { user, logout, loadingUser, read } = useAuth();
  const [username1, setUsername1] = useState();
  const [mail, setMail] = useState();
  const [image, setImage] = useState();
  const [typeSub, setTypeSub] = useState();
  const [rented, setRented] = useState();
  const [watchList, setWatchList] = useState();
  const [admin, setAdmin] = useState();
  const [input, setInput] = useState({
    username: '',
    email: '',
    active: '',
  });
  const [changeUserName, setChangeUserName] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [slider, setSlider] = useState(null);

  async function logOut() {
    await logout();
    navigate('/');
  }

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setFormErrors(validate(input));
  }

  const updateUserInfo = async () => {
    if (Object.keys(formErrors).length === 0 && input.username.length >= 5) {
      const userRef = doc(firestore, `/users/${user.uid}`);
      await updateDoc(userRef, {
        username: input.username,
      });
      setUsername1(input.username);
      setInput({
        username: '',
      });
      setChangeUserName(false);
      alert('Ussername updated succesfully');
    } else {
      alert(formErrors.name || 'Username must be completed');
    }
  };

  const accDelete = async () => {
    const userRef = doc(firestore, `/users/${user.uid}`);
    await updateDoc(userRef, {
      active: false,
    });
    alert('Your account is deleted');
    logOut();
  };

  const changeUser = () => {
    setChangeUserName(true);
  };
  const changeState = () => {
    setChangeUserName(false);
    setInput({
      username: '',
    });
  };
  const goBack = () => {
    window.history.go(-1);
  };
  function validate(x) {
    let errors = {};
    if (!x.username.trim()) {
      errors.name = 'Name must be completed';
    } else if (x.username.trim().length < 4) {
      errors.name = 'Name must have more than 5 letters';
    } else if (x.username.length === 0) {
      errors.name = 'Name must be completed';
    }

    return errors;
  }

  useEffect(() => {
    async function exe() {
      let dataUser = await read(user.uid);
      console.log(dataUser);
      setUsername1(dataUser.username);
      setMail(dataUser.email);
      setImage(dataUser.avatar);
      setTypeSub(dataUser.subscription);
      setAdmin(dataUser.admin);
      setRented(dataUser.rented);
      setWatchList(dataUser.watchList);
    }
    exe();
  }, [user.uid]);

  if (loadingUser) return <h1>loading</h1>;
  return (
    <div style={{ background: '#111111', height: '100vh' }}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        background={'#111111'}
        marginBottom={'5vh'}
        shadow="0px 0.5px 8px #444444"
      >
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <RouteLink to="/home">
              <Image
                boxSize="100px"
                objectFit="cover"
                src={logo}
                alt="Logo-kinema"
              />
            </RouteLink>
          </Box>
          <Box>
            <Button onClick={goBack} variant="link">
              Back
            </Button>
          </Box>
        </HStack>
        <Flex alignItems={'center'}></Flex>
      </Flex>

      <Flex justify={'center'}>
        <VStack justify="center">
          <Tabs
            size="md"
            variant="enclosed"
            h="85vh"
            w="50vw"
            border={'black'}
            bgGradient="linear(to-b, #222222, #333333)"
            borderRadius={'5px'}
            overflow={'hidden'}
            color={'white'}
          >
            <TabList>
              <Tab
                fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                color={'#99a3a4'}
              >
                Profile
              </Tab>
              <Tab
                fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                color={'#99a3a4'}
              >
                Account
              </Tab>
              <Tab
                fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                color={'#99a3a4'}
                border
              >
                Edit
              </Tab>
            </TabList>
            <TabPanels align={'center'}>
              <TabPanel>
                <Avatar
                  size={'xl'}
                  src={image}
                  alt={'Avatar Alt'}
                  mb={4}
                  pos={'relative'}
                />
                <Box
                  fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                  marginBottom={'2vh'}
                  color={'#99a3a4'}
                >
                  Hello! {username1}
                </Box>
                <Box>
                  {typeSub === 1 ? (
                    <Box
                    >
                      {rented && rented.length > 0 ? (
                        <Box
                          position={'relative'}
                          height={'270px'}
                          width={'90%'}
                          overflow={'hidden'}
                        >
                          {/* CSS files for react-slick */}
                          <link
                            rel="stylesheet"
                            type="text/css"
                            charSet="UTF-8"
                            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                          />
                          <link
                            rel="stylesheet"
                            type="text/css"
                            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                          />
                          {/* Left Icon */}
                          {/* Right Icon */}
                          {/* Slider */}
                          <Text
                        marginBottom={'2vh'}
                        borderColor={'#424949'}
                        fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                        color={'#99a3a4'}
                      >
                        {' '}
                        Enjoy your rented content{' '}
                      </Text>
                          <Slider
                            {...settings}
                            ref={(slider) => setSlider(slider)}
                          >
                            {rented.map((r, index) => {
                              if (r.serie) {
                                return (
                                  <Box
                                    maxW={'260px'}
                                    key={index}
                                    m={'1vh'}
                                    mt="1vh"
                                    transition="0.4s"
                                    _hover={{
                                      transform: 'scale(1.07)',
                                      transition: '0.8s',
                                    }}
                                  >
                                    <RouteLink
                                      to={`/home/tv_show_details/${r.id}`}
                                      position="relative"
                                      w={'250px'}
                                    >
                                      <Image
                                        src={r.posterImg}
                                        borderRadius="0.5vh"
                                      ></Image>
                                    </RouteLink>
                                  </Box>
                                );
                              } else {
                                return (
                                  <Box
                                    maxW={'260px'}
                                    key={index}
                                    m={'1vh'}
                                    mt="1vh"
                                    transition="0.4s"
                                    _hover={{
                                      transform: 'scale(1.07)',
                                      transition: '0.8s',
                                    }}
                                  >
                                    <RouteLink
                                      to={`/home/movie_details/${r.id}`}
                                      position="relative"
                                      w={'250px'}
                                    >
                                      <Image
                                        src={r.posterImg}
                                        borderRadius="0.5vh"
                                      ></Image>
                                    </RouteLink>
                                  </Box>
                                );
                              }
                            })}
                          </Slider>
                        </Box>
                      ) : (
                        <Box>
                          <Text color={'#99a3a4'} fontSize={{ base: '14px', md: '16px', lg: '20px' }}>No rented Movies or Tv Shows</Text>
                          <Text color={'#99a3a4'} fontSize={{ base: '14px', md: '16px', lg: '20px' }}>Go to <Button variant={"link"} color={' #2ecc71 '}><RouteLink to='/home'>EXPLORE</RouteLink></Button></Text>
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <Box
                    >
                      {watchList && watchList.length > 0 ? (
                        <Box
                          position={'relative'}
                          height={'270px'}
                          width={'90%'}
                          overflow={'hidden'}
                        >
                          {/* CSS files for react-slick */}
                          <link
                            rel="stylesheet"
                            type="text/css"
                            charSet="UTF-8"
                            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                          />
                          <link
                            rel="stylesheet"
                            type="text/css"
                            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                          />
                          {/* Left Icon */}
                          {/* Right Icon */}
                          {/* Slider */}
                          <Text
                        marginBottom={'2vh'}
                        borderColor={'#424949'}
                        fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                        color={'#99a3a4'}
                      >
                        {' '}
                        Enjoy your rented content{' '}
                      </Text>
                          <Slider
                            {...settings}
                            ref={(slider) => setSlider(slider)}
                          >
                            {watchList.map((r, index) => {
                              if (r.serie) {
                                return (
                                  <Box
                                    maxW={'260px'}
                                    key={index}
                                    m={'1vh'}
                                    mt="1vh"
                                    transition="0.4s"
                                    _hover={{
                                      transform: 'scale(1.07)',
                                      transition: '0.8s',
                                    }}
                                  >
                                    <RouteLink
                                      to={`/home/tv_show_details/${r.id}`}
                                      position="relative"
                                      w={'250px'}
                                    >
                                      <Image
                                        src={r.posterImg}
                                        borderRadius="0.5vh"
                                      ></Image>
                                    </RouteLink>
                                  </Box>
                                );
                              } else {
                                return (
                                  <Box
                                    maxW={'260px'}
                                    key={index}
                                    m={'1vh'}
                                    mt="1vh"
                                    transition="0.4s"
                                    _hover={{
                                      transform: 'scale(1.07)',
                                      transition: '0.8s',
                                    }}
                                  >
                                    <RouteLink
                                      to={`/home/movie_details/${r.id}`}
                                      position="relative"
                                      w={'250px'}
                                    >
                                      <Image
                                        src={r.posterImg}
                                        borderRadius="0.5vh"
                                      ></Image>
                                    </RouteLink>
                                  </Box>
                                );
                              }
                            })}
                          </Slider>
                        </Box>
                      ) : (
                        <Box>
                          <Text color={'#99a3a4'} fontSize={{ base: '14px', md: '16px', lg: '20px' }}>No favorites Movies or Tv Shows</Text>
                          <Text color={'#99a3a4'} fontSize={{ base: '14px', md: '16px', lg: '20px' }}>Go to <Button variant={"link"} color={' #2ecc71 '}><RouteLink to='/home'>EXPLORE</RouteLink></Button></Text>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              </TabPanel>
              <TabPanel>
              <Box
                  borderRadius={'4px'}
                  marginBottom={'2vh'}
                  border="solid 1px"
                  borderColor={'#424949'}
                >
                  <Text
                    background={'#424949'}
                    border="solid 1px"
                    borderColor={'#424949'}
                    color={'#99a3a4'}
                    fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                  >
                    Username
                  </Text>
                  <Text fontSize={{ base: '14px', md: '16px', lg: '20px' }} color={'#99a3a4'}>
                        {username1}
                  </Text>
                </Box>
                <Box
                  borderRadius={'4px'}
                  marginBottom={'2vh'}
                  border="solid 1px"
                  borderColor={'#424949'}
                >
                  <Text
                    background={'#424949'}
                    border="solid 1px"
                    borderColor={'#424949'}
                    color={'#99a3a4'}
                    fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                  >
                    Email
                  </Text>
                  <Text fontSize={{ base: '14px', md: '16px', lg: '20px' }} color={'#99a3a4'}>
                        {mail}
                  </Text>
                </Box>
                <Box
                  borderRadius={'4px'}
                  marginBottom={'2vh'}
                  border="solid 1px"
                  borderColor={'#424949'}
                >
                  <Text
                    background={'#424949'}
                    border="solid 1px"
                    borderColor={'#424949'}
                    color={'#99a3a4'}
                    fontSize={{ base: '20px', md: '30px', lg: '35px' }}
                  >
                    Subscription
                  </Text>
                  <Text fontSize={{ base: '14px', md: '16px', lg: '20px' }}>
                    {typeSub === 1 ? (
                      <Text color={'#99a3a4'}>Basic</Text>
                    ) : (
                      <Text color={' #f9e79f '}>Premium</Text>
                    )}
                  </Text>
                </Box>
                <Box borderRadius={'4px'} marginBottom={'2vh'}>
                  {typeSub === 1 ? (
                    <Box
                      border="solid 1px"
                      borderColor={'#424949'}
                      borderRadius={'4px'}
                    >
                      <Text
                        background={'#424949'}
                        border="solid 1px"
                        borderColor={'#424949'}
                        color={'#99a3a4'}
                        fontSize={{ base: '20px', md: '30px', lg: '35px' }}
                      >
                        Be Premium
                      </Text>
                      <RouteLink to="/payment">
                        <Text
                          fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                          color={'green'}
                        >
                          Change Subscription
                        </Text>
                      </RouteLink>
                    </Box>
                  ) : (
                    <Box
                      border="solid 1px"
                      borderColor={'#424949'}
                      borderRadius={'4px'}
                    >
                      <Text
                        background={'#424949'}
                        border="solid 1px"
                        borderColor={'#424949'}
                        color={'#99a3a4'}
                        fontSize={{ base: '20px', md: '30px', lg: '35px' }}
                      >
                        Downgrade
                      </Text>
                      <RouteLink to="/payment">
                        <Text
                          fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                          color={'#cd6155'}
                        >
                          Cancel Subscription
                        </Text>
                      </RouteLink>
                    </Box>
                  )}
                </Box>
                <Box
                  marginBottom={'2vh'}
                  border="solid 1px"
                  borderColor={'#424949'}
                  borderRadius={'4px'}
                >
                  <Text
                    background={'#424949'}
                    border="solid 1px"
                    borderColor={'#424949'}
                    color={'#99a3a4'}
                    fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                  >
                    Delete Account
                  </Text>
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        background={'none'}
                        color={'#cd6155'}
                        variant="link"
                      >
                        Delete
                      </Button>
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>
                          Are you sure you want to delete?
                        </PopoverHeader>
                        <PopoverBody>
                          <Button background={'#cd6155'} onClick={accDelete}>
                            Delete
                          </Button>
                        </PopoverBody>
                      </PopoverContent>
                    </Portal>
                  </Popover>
                </Box>
              </TabPanel>
              <TabPanel>
                <Avatar
                  size={'xl'}
                  src={image}
                  alt={'Avatar Alt'}
                  mb={4}
                  pos={'relative'}
                />
                <Box
                  marginBottom={'2vh'}
                  border="solid 1px"
                  borderColor={'#424949'}
                  borderRadius={'4px'}
                >
                  <Text
                    background={'#424949'}
                    fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                    color={'#99a3a4'}
                    border="solid 1px"
                    borderColor={'#424949'}
                  >
                    Username
                  </Text>
                  <Text
                    fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                    color={'#99a3a4'}
                  >
                    {username1}
                  </Text>
                </Box>
                <Box
                  borderRadius={'4px'}
                  marginBottom={'2vh'}
                  fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                  color={'#99a3a4'}
                  border="solid 1px"
                  borderColor={'#424949'}
                >
                  <Text
                    background={'#424949'}
                    fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                    color={'#99a3a4'}
                    border="solid 1px"
                    borderColor={'#424949'}
                  >
                    Email
                  </Text>
                  <Text
                    fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                    color={'#99a3a4'}
                  >
                    {mail}
                  </Text>
                </Box>
                <Button
                  marginBottom={'2vh'}
                  background={'#aed6f1'}
                  color={'#424949'}
                  onClick={changeUser}
                >
                  Change Username
                </Button>
                <Box marginBottom={'2vh'}>
                  {changeUserName ? (
                    <Box>
                      <Input
                        marginBottom={'2vh'}
                        background={'#424949'}
                        color={'#99a3a4'}
                        placeholder="New Username"
                        type="text"
                        value={input.username}
                        name="username"
                        onChange={(e) => handleChange(e)}
                      />
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            background="#bdecb6"
                            color={'#424949'}
                            marginRight={'5vw'}
                          >
                            Update
                          </Button>
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>
                              <Text color={'#424949'}>
                                Are you sure you want to update? From{' '}
                                {username1} to
                                {input.username}?
                              </Text>
                            </PopoverHeader>
                            <PopoverBody>
                              <Button
                                marginRight={'5vw'}
                                background="#bdecb6"
                                color={'#424949'}
                                onClick={updateUserInfo}
                              >
                                Update
                              </Button>
                              <Button
                                background={'#cd6155'}
                                color={'#424949'}
                                onClick={changeState}
                              >
                                Cancel
                              </Button>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                      <Button
                        background={'#cd6155'}
                        color={'#424949'}
                        onClick={changeState}
                      >
                        Cancel
                      </Button>
                    </Box>
                  ) : null}
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Flex>
    </div>
  );
}
