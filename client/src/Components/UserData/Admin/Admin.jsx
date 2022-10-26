/* eslint-disable */
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../AuthContext/AuthContext";
import { firestore } from "../../AuthContext/firebase";
import {
  Box,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Box,
  PopoverBody,
} from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";
import Statistics from "./StatisticsAdmin";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../AuthContext/AuthContext";
import { firestore } from "../../AuthContext/firebase";
import { Navigate } from "react-router-dom";
import edit from "../../../Assets/edit.png";
import prohibition from "../../../Assets/prohibition.png";

export default function Admin() {
  const [ready, setReady] = useState(false);
  const [users, setUsers] = useState([]);
  const userData = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { user, loadingUser } = useAuth()

  async function allUsers() {
    let allUsers = [];
    const querySnapshot = await getDocs(collection(firestore, "users"));
    querySnapshot.forEach((doc) => {
      allUsers.push(doc.data());
    });
    return allUsers;
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const premiumUsers = users.filter((u) => u.subscription === 2);
  const basicUsers = users.filter((u) => u.subscription === 1);

  function searcher(e) {
    e.preventDefault();
    setSearch(e.target.value);
    setPage(1);
  }

  let results = [];
  if (!search) {
    results = users;
  } else {
    results = users.filter(
      (data) =>
        data.email.includes(search) ||
        data.username.toLowerCase().includes(search.toLowerCase())
    );
  }

  const indexOfLast = page * 10;
  const indexOfFirst = indexOfLast - 10;
  const currentUsers = results.slice(indexOfFirst, indexOfLast);

  function prevPage(e) {
    e.preventDefault();
    if (page > 1) return setPage(page - 1);
  }

  let totalPaginas = Math.ceil(results.length / 10);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(results.length / 10); i++) {
    pageNumbers.push(i);
  }

  const nextPage = (e) => {
    e.preventDefault();
    if (page !== totalPaginas) return setPage(page + 1);
  };

  function sortRented(){
    let res = results.sort((a,b) => {
      if(a.rented.length < b.rented.length) return 1 
      if(a.rented.length > b.rented.length) return -1 
      return 0
    })
    
    setOrder(res)
  }
  
  function sortByDate(){
    let res = results.sort((a,b) => {
      if(a.subscriptionDate < b.subscriptionDate) return 1 
      if(a.subscriptionDate > b.subscriptionDate) return -1 
      return 0
    })
    
    setByDate(res)
  }

  const accDelete = async (e) => {
   let arrUsers = []
    let snap = await getDocs(collection(firestore, "users"))
    snap.forEach((doc) => {
      arrUsers.push(doc.data());
    });
   if(!ban) {
    setBan(e.target.value)

  }else {
    let userFilter = arrUsers.filter(u => u.username === ban)
    let filteredUser = userFilter[0]
    await updateDoc(filteredUser, {
      active: false,
    });
  }
  
  let backgroundBox = useColorModeValue("gray.100", "gray.900")

  useEffect(() => {
    async function exe() {
      let allUsersData = await allUsers();
      setUsers(allUsersData);
      setReady(true);
    }
    exe();
  }, [ready]);

  if(loadingUser) return null
  if(!user) return <Navigate  to={"/home"} />
  if(!userData.admin) return <Navigate  to={"/home"} />

  return (
    <Box bg={loadingUser ? null : backgroundBox} height={"100%"}>
      <AdminNavbar
        users={users}
        search={search}
        searcher={searcher}
        results={results}
        user={userData}
      />
      <Statistics
        totalUsers={users.length}
        premiumUsers={premiumUsers.length}
        basicUsers={basicUsers.length}
      />

      {/* <TableSales/> */}
      <Box bg={loadingUser ? null : backgroundBox}>
        <Center margin={"20px"}>
          <Button
            color={"black"}
            onClick={prevPage}
            backgroundColor="lightgray"
          >
            Prev
          </Button>
          <label style={{ marginLeft: "20px", marginRight: "20px" }}>
            <Button color={"black"} backgroundColor="lightgray">
              {page}
            </Button>{" "}
            de {totalPaginas}
          </label>
          <Button
            color={"black"}
            onClick={nextPage}
            backgroundColor="lightgray"
          >
            Next
          </Button>
        </Center>

        <TableContainer
          bg={loadingUser ? null : backgroundBox}
          height={"700px"}
        >
          <Center>
            <Table variant="simple" width={"90%"}>
              <Thead>
                <Tr>
                  <Th fontSize={"14px"}>Photo</Th>
                  <Th fontSize={"14px"}>Email</Th>
                  <Th fontSize={"14px"}>Username</Th>
                  <Th fontSize={"14px"}>
                    Subscription Date{" "}
                    <Button
                      padding={"5px"}
                      height={"25px"}
                      fontSize={"12px"}
                      border={"1px solid black"} onClick={sortByDate} 
                    >
                      Sort
                    </Button>
                  </Th>
                  <Th fontSize={"14px"}>Subscription</Th>
                  <Th fontSize={"14px"}>
                    Rented{" "}
                    <Button
                      padding={"5px"}
                      height={"25px"}
                      fontSize={"12px"}
                      border={"1px solid black"} onClick={sortRented }
                    >
                      Sort
                    </Button>
                  </Th>
                  <Th fontSize={"14px"}>Status</Th>
                  <Th fontSize={"14px"}>Edit</Th>
                  <Th fontSize={"14px"}>Ban</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users
                  ? currentUsers.map((user, i) => {
                      let activeOrNot = user.active ? "Active" : "Banned";

                      return (
                        <Tr>
                          <Td>
                            <Avatar size={"md"} src={user.avatar} />
                          </Td>
                          <Td fontSize={"14px"} key={user.email} color={"gray"}>
                            {user.email}
                          </Td>
                          <Td
                            fontSize={"14px"}
                            key={user.username}
                            color={"gray"}
                          >
                            {user.username}
                          </Td>
                          <Td
                            fontSize={"14px"}
                            key={user.subscriptionDate}
                            color={"gray"}
                          >
                            {user.subscriptionDate
                              .toDate()
                              .toLocaleDateString("en-US", options)}
                          </Td>
                          <Td fontSize={"14px"} color={"gray"}>
                            {user.subscription === 1 ? "Basic" : "Premium"}
                          </Td>
                          <Td fontSize={"14px"} color={"gray"}>
                            {user.rented.length}
                          </Td>
                          <Td fontSize={"14px"} color={"gray"}>
                            {activeOrNot}
                          </Td>
                          <Td key={i + 1} color={"gray"}>
                                  <Button background={"lightgray"} >
                                    <Image src={edit} alt="delete_image" width="20px" height="20px" color="white" />
                                  </Button>
                          </Td>
                          <Td>
                            <Box>
                              <Popover>
                                <PopoverTrigger>
                                  <Button background={"lightgray"} >
                                    <Image src={prohibition} alt="delete_image" width="20px" height="20px" color="white" />
                                  </Button>
                                </PopoverTrigger>
                                <Portal>
                                  <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>
                                      Are you sure you want to ban{" "}
                                      {user.username}?
                                    </PopoverHeader>
                                    <PopoverBody>
                                      <Button
                                        background={"#cd6155"}
                                        value={user.username}
                                        onClick={accDelete}
                                      >
                                        Ban
                                      </Button>
                                    </PopoverBody>
                                  </PopoverContent>
                                </Portal>
                              </Popover>
                            </Box>
                          </Td>
                        </Tr>
                      );
                    })
                  : null}
              </Tbody>
            </Table>
          </Center>
        </TableContainer>
        <Center marginTop={"20px"} paddingBottom={"30px"}>
          <Button
            color={"black"}
            onClick={prevPage}
            backgroundColor="lightgray"
          >
            Prev
          </Button>
          <label style={{ marginLeft: "20px", marginRight: "20px" }}>
            <Button color={"black"} backgroundColor="lightgray">
              {page}
            </Button>{" "}
            de {totalPaginas}
          </label>
          <Button
            color={"black"}
            onClick={nextPage}
            backgroundColor="lightgray"
          >
            Next
          </Button>
        </Center>
      </Box>
    </Box>
  );
}
