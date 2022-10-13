import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = ['ALL', 'MOVIES', 'TV SHOWS'];

const NavLink1 = () => (
  <Link
      px={2}
      py={1}
      rounded={'md'}
      color='gray.400'
      _hover={{
        textDecoration: 'none',
        color: 'white',
      }}
    href={'/home'}>
        {Links[0]}
  </Link>
);

const NavLink2 = () => (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      color='gray.400'
      _hover={{
        textDecoration: 'none',
        color: 'white',
      }}
      href={'/home/movies'}>
          {Links[1]}
    </Link>
  );

  const NavLink3 = () => (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      color='gray.400'
      _hover={{
        textDecoration: 'none',
        color: 'white',
      }}
      href={'/home/tv_shows'}>
          {Links[2]}
    </Link>
  );

  const color = {
    kinemaBg: "#1d1d1d"
  }

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={color.kinemaBg} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <NavLink1/>
              <NavLink2/>
              <NavLink3/>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Watchlist</MenuItem>
                <MenuDivider />
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
                <NavLink1/>
                <NavLink2/>
                <NavLink3/>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}