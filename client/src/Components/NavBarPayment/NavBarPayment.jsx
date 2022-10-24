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
import { BsArrowReturnLeft } from 'react-icons/bs';
import { useAuth } from "../AuthContext/AuthContext";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

import logo from "../../Assets/logo.png";
import { color } from "../globalStyles";
import { useSelector } from "react-redux";




export default function NavBarPayment({ ruta }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useAuth()
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState();

  async function logOut() {
    await logout();
    navigate("/");
  }

  function functionBack() {
    navigate(-1);
  }

  return (
    <>
      <Box  bgGradient='linear(to-b, rgba(0,0,0,0.6839110644257703) 35%, rgba(0,0,0,0) 100%)' px={4} w="100%" >
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
              <RouteLink to="/home">
              <Image
                boxSize="100px"
                objectFit="cover"
                src={logo}
                alt="Logo-kinema"
              />
              </RouteLink>
           
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
             
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
          <Button onClick={() => functionBack()} variant='outline' 
                color={'white'}
              _hover={{ bg: 'blue.400' }}
              rightIcon={<BsArrowReturnLeft />}>Back</Button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
            
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
