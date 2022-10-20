import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useAuth } from "../../AuthContext/AuthContext"
import { firestore } from "../../AuthContext/firebase"
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
    Input
  } from '@chakra-ui/react'
import edit from "../../../Assets/edit.png"
import deleted from "../../../Assets/delete.png"


export default function Admin(){

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const userData = useSelector(state => state.user)
    const [ready, setReady] = useState(false)
    const {user, loadingUser} = useAuth()

    async function allUsers(){
        let allUsers = []
        const querySnapshot = await getDocs(collection(firestore, "users"));
            querySnapshot.forEach((doc) => {
                
            allUsers.push(doc.data())
            });
        return allUsers
    }


    const indexOfLast = page * 20
    const indexOfFirst = indexOfLast - 20
    const currentUsers = users.slice(
        indexOfFirst, indexOfLast
    )
        console.log(currentUsers)

    function prevPage(){
        if (page > 1) return setPage(page - 1)
    }

    let totalPaginas = Math.ceil(users.length / 20)

    const next = () => {
        if (page !== totalPaginas) return setPage(page + 1)
    }

    function searcher(e){
        setSearch(e.target.value)
    }

    let results = []
    if(!search){
        results = users
    } else{
        results = users.filter((data) => data.email.includes(search) )
    }

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };


    useEffect(()=>{
        async function exe(){
            let allUsersData = await allUsers()
            setUsers(allUsersData)
            setReady(true)
        }
        exe()
    }, [ready])


    if(loadingUser) return null

    return(
        <div style={{"background": "white", "height": "100%"}} >
           
           <Heading noOfLines={1}
           padding={"30px"}
           >
            <Center>
                Admin Panel
            </Center>
            </Heading>
 
            <Input 
            value={search}
            onChange={searcher}
            placeholder='Search....'
             />

<TableContainer>
  <Table variant='simple'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th color={"black"} fontSize={"14px"} >Email</Th>
        <Th color={"black"} fontSize={"14px"} >Username</Th>
        <Th color={"black"} fontSize={"14px"} >Subscription Date</Th>
        <Th color={"black"} fontSize={"14px"} >Subscription</Th>
        <Th color={"black"} fontSize={"14px"} >Edit</Th>
        <Th color={"black"} fontSize={"14px"} >Delete</Th>
      </Tr>
    </Thead>
    <Tbody>
      {
        users ? 
        results.map((user, i) => {

        return <Tr> 
            <Td fontSize={"14px"} key={user.email} >{user.email}</Td>
            <Td fontSize={"14px"} key={user.username} >{user.username}</Td>
            <Td fontSize={"14px"} key={user.subscriptionDate} >{user.subscriptionDate.toDate().toLocaleDateString('en-US',
            options)}</Td>
            <Td fontSize={"14px"} >{user.subscription === 1 ? "Basic" : "Premium" }</Td>
            <Td  key={i+1} ><button style={{"paddingLeft": "10px"}} ><img src={edit} alt="" /></button></Td>
            <Td  ><button style={{"paddingLeft": "15px"}} ><img src={deleted} alt="" /></button></Td>
        </Tr>
        }
        )
        : 
        null
      }
      
    </Tbody>

  </Table>
</TableContainer>


        </div>
    )
}