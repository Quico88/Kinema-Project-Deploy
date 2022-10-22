import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../AuthContext/AuthContext";
import { firestore } from "../../AuthContext/firebase";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Center,
  Input,
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Switch,
  Box,
  PopoverBody,
  Select,
} from "@chakra-ui/react";
import edit from "../../../Assets/edit.png";
import deleted from "../../../Assets/delete.png";
import { Navigate } from "react-router-dom";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [ban, setBan] = useState()
  const [order, setOrder] = useState()
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState()
  const userData = useSelector((state) => state.user);
  const [ready, setReady] = useState(false);
  const { user, loadingUser } = useAuth();

  async function allUsers() {
    let allUsers = [];
    const querySnapshot = await getDocs(collection(firestore, "users"));
    querySnapshot.forEach((doc) => {
      allUsers.push(doc.data());
    });
    return allUsers;
  }

  function searcher(e) {
    setSearch(e.target.value);
  }

  
  let results = [];
  if (!search) {
    results = users;
  } else {
    results = users.filter(
      (data) =>
      data.email.includes(search) ||
      data.username.toLowerCase().includes(search.toLowerCase()),    
      );
    }

    const indexOfLast = page * 20;
  const indexOfFirst = indexOfLast - 20;
  const currentUsers = results.slice(indexOfFirst, indexOfLast);
  
  function prevPage(e) {
    e.preventDefault()
    if (page > 1) return setPage(page - 1);
  }

  let totalPaginas = Math.ceil(users.length / 20);
  

  const pageNumbers = []

  for(let i = 1; i <= Math.ceil(users.length / 20); i++){
    pageNumbers.push(i)
  }

  const nextPage = (e) => {
    e.preventDefault()
    if (page !== totalPaginas) return setPage(page + 1);
  };

  function pageNumber(page){
    setPage(page)
  }

    function sortRented(){
      results.sort((a,b) => {
        if(a.rented.length < b.rented.length) return 1 
        if(a.rented.length > b.rented.length) return -1 
      })
      
      setOrder(results)
    }
    
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const accDelete = async (e) => {
   /*  const userRef = doc(firestore, `/users/${user.uid}`); */
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
    console.log(filteredUser)
    await updateDoc(filteredUser, {
      active: false,
    });

  }

  
  
  
  /*    */
  };

  useEffect(() => {
    async function exe() {
      let allUsersData = await allUsers();
      setUsers(allUsersData);
      setTotalPages(pageNumbers)
      setReady(true);
    }
    exe();
  }, [ready]);

  if (loadingUser) return null;

  if(!userData.admin) return <Navigate  to={"/home"} />

  return (
    <div style={{ background: "white", height: "100vh" }}>
     <Box backgroundColor={"white"} > 
      <Heading noOfLines={1} padding={"30px"}>
        <Center>Admin Panel</Center>
      </Heading>
      <Box display={"flex"} flexDirection={"flex-end"}>
        <Input value={search} onChange={searcher} placeholder="Search...." />
      </Box>
      {/* <Select><option value='option1'>Users Per Page</option></Select> */}
    <Center margin={"20px"}>
      <Button onClick={prevPage} >Prev</Button>
        {/* {totalPages ? totalPages.map((n) => <Button onClick={()=>pageNumber(n)} >{n}</Button> ): null} */}
        <label style={{"marginLeft": "20px", "marginRight": "20px"}} ><Button>{page}</Button> de {totalPaginas}</label>
      <Button onClick={nextPage} >Next</Button>
      </Center>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color={"black"} fontSize={"14px"}>
                Email
              </Th>
              <Th color={"black"} fontSize={"14px"}>
                Username
              </Th>
              <Th color={"black"} fontSize={"14px"}>
                Subscription Date
              </Th>
              <Th color={"black"} fontSize={"14px"}>
                Subscription
              </Th>
              <Th color={"black"} fontSize={"14px"}>
                Rented <button onClick={sortRented }>{/* <img src={options2} alt="options" /> */}Sort</button> {/* <Switch size='sm' onClick={sortRented} /> */}
              </Th>
              <Th color={"black"} fontSize={"14px"}>
                Status
              </Th>
              <Th color={"black"} fontSize={"14px"}>
                Edit
              </Th>
              <Th color={"black"} fontSize={"14px"}>
                Delete
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {users
              ? currentUsers.map((user, i) => {

                let activeOrNot = user.active ? "Active" : "Banned"

                  return (
                    <Tr>
                      <Td fontSize={"14px"} key={user.email}>
                        {user.email}
                      </Td>
                      <Td fontSize={"14px"} key={user.username}>
                        {user.username}
                      </Td>
                      <Td fontSize={"14px"} key={user.subscriptionDate}>
                        {user.subscriptionDate
                          .toDate()
                          .toLocaleDateString("en-US", options)}
                      </Td>
                      <Td fontSize={"14px"}>
                        {user.subscription === 1 ? "Basic" : "Premium"}
                      </Td>
                      <Td fontSize={"14px"}>{user.rented.length}</Td>
                      <Td fontSize={"14px"}>
                        {activeOrNot}
                      </Td>
                      <Td key={i + 1}>
                        <button style={{ paddingLeft: "10px" }}>
                          <img src={edit} alt="" />
                        </button>
                      </Td>
                      <Td>
                        <Box>
                          <Popover>
                            <PopoverTrigger>
                              <Button>
                                <img src={deleted} alt="delete_image" />
                              </Button>
                            </PopoverTrigger>
                            <Portal>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>
                                  Are you sure you want to ban {user.username}?
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
      </TableContainer>
      <Center margin={"20px"} paddingBottom={"20px"}>
      <Button onClick={prevPage} >Prev</Button>
        {/* {totalPages ? totalPages.map((n) => <Button onClick={()=>pageNumber(n)} >{n}</Button> ): null} */}
        <label style={{"marginLeft": "20px", "marginRight": "20px"}} ><Button>{page}</Button> de {totalPaginas}</label>
      <Button onClick={nextPage} >Next</Button>
      </Center>
    </Box>
    </div>
  );
}
