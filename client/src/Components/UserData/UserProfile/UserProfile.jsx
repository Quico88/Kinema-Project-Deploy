import { useAuth } from "../../AuthContext/AuthContext"
import { useNavigate } from "react-router-dom"
import { doc, setDoc, getDoc  } from "firebase/firestore";
import { firestore } from "../../AuthContext/firebase";
import { useEffect, useState } from "react";
/* import axios from "axios"
import { useEffect } from "react" */


export default function UserProfile(){
    const navigate = useNavigate()
    const {user, logout, loading} = useAuth()
    const [username1, setUsername1] = useState()

    async function logOut(){
       await logout()
        navigate("/")
    }

    async function read(id){
        const docRef = doc(firestore, `/users/${id}`);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  /* console.log("Document data:", docSnap.data()); */
  let data = docSnap.data()
  return data
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
    }


    useEffect(()=>{
        async function exe(){
            let dataUser = await read(user.uid)
            setUsername1(dataUser.username)
        }
        exe()
    }, [])

 


   /*  console.log(user) */

    if(loading) return <h1>loading</h1>

    return (
        <div>
            
            <h1> Esta es la Pag del perfil del usuario  </h1>

            <h1>Welcome {username1}  </h1> 

            <h1>Email: {user.email} </h1>

            <button onClick={logOut}  >Log out</button>
           

        </div>
    )
}