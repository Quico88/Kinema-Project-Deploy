import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  MenuGroup,
} from "@chakra-ui/react";
import { useAuth } from "../AuthContext/AuthContext";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar.jsx";
import logo from "../../Assets/logo.png";
import { color } from "../globalStyles";

const Links = ["Home", "Movies", "TV Shows"];

const NavLink1 = ({ ruta }) => {
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      fontWeight="500"
      textShadow={
        ruta === "Home"
          ? color.shadowTextLinkSelected
          : color.shadowTextLinkUnselected
      }
      color={
        ruta === "Home" ? color.textLinkSelected : color.textLinkUnselected
      }
      _hover={{
        textDecoration: "none",
        color: color.textLinkSelected,
        textShadow: "0px 0px 20px white",
      }}
    >
      {Links[0]}
    </Link>
  );
};

const NavLink2 = ({ ruta }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    color={
      ruta === "Movies" ? color.textLinkSelected : color.textLinkUnselected
    }
    fontWeight="500"
    textShadow={
      ruta === "Movies"
        ? color.shadowTextLinkSelected
        : color.shadowTextLinkUnselected
    }
    _hover={{
      textDecoration: "none",
      color: color.textLinkSelected,
      textShadow: "0px 0px 20px white",
    }}
  >
    {Links[1]}
  </Link>
);

const NavLink3 = ({ ruta }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    color={
      ruta === "Series" ? color.textLinkSelected : color.textLinkUnselected
    }
    fontWeight="500"
    textShadow={
      ruta === "Series"
        ? color.shadowTextLinkSelected
        : color.shadowTextLinkUnselected
    }
    _hover={{
      textDecoration: "none",
      color: color.textLinkSelected,
      textShadow: "0px 0px 20px white",
    }}
  >
    {Links[2]}
  </Link>
);

export default function NavBar({ ruta }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout, loadingUser, read } = useAuth();
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState();

  async function logOut() {
    await logout();
    navigate("/");
  }

  useEffect(() => {
    async function exe() {
      const infoUser = await read(user.uid);
      setDataUser(infoUser);
    }
    exe();
  }, []);

  return (
    <>
      <Box bg={color.kinemaBg} px={4} w="100%" shadow="0px 0.5px 8px #444444">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Image
                boxSize="100px"
                objectFit="cover"
                src={logo}
                alt="Logo-kinema"
              />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <RouteLink to="/home">
                <NavLink1 ruta={ruta} />
              </RouteLink>
              <RouteLink to="/home/movies">
                <NavLink2 ruta={ruta} />
              </RouteLink>
              <RouteLink to="/home/tv_shows">
                <NavLink3 ruta={ruta} />
              </RouteLink>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <SearchBar />
            {dataUser ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} src={dataUser.avatar} />
                </MenuButton>
                <MenuList>
                  <MenuGroup fontSize={20} title={dataUser.username}>
                    <MenuDivider />
                    <RouteLink to="/profile">
                      <MenuItem>Profile</MenuItem>
                    </RouteLink>
                    <MenuItem>Watchlist</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={logOut}>Log out</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Button mr={2} onClick={() => navigate("/login")}>
                  Log In
                </Button>
                <Button onClick={() => navigate("/register")}>Register</Button>
              </>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <RouteLink to="/home">
                <NavLink1 />
              </RouteLink>
              <RouteLink to="/home/movies">
                <NavLink2 />
              </RouteLink>
              <RouteLink to="/home/tv_shows">
                <NavLink3 />
              </RouteLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
