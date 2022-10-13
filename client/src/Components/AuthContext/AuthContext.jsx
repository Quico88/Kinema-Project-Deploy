import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, Timestamp  } from "firebase/firestore";
import { auth, firestore} from "./firebase";

export const authContext = createContext()


export const useAuth = () =>{  
    const context = useContext(authContext)
    if(!context) throw new Error("There is not auth context")
    return context
}


export default function AuthProvider({children}){

    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState(null)

    const signup = async (userEmail, password, displayName) => {
        let infoUser = await createUserWithEmailAndPassword(auth, userEmail, password, displayName)
                                .then(userFirebase => userFirebase)
        console.log(infoUser)
        const docRef =  doc(firestore, `/users/${infoUser.user.uid}`)
        setDoc(docRef, { username: displayName, email: userEmail, admin: false, subscription: 1, subscriptionDate: Timestamp.fromDate(new Date()).toDate(), watchList: [], avatar: "https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg", active: true, rented: []   })
    }

    const login = async(email, password) => {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
}

    const loginWithGoogle = async () =>{
        const googleProvider = new GoogleAuthProvider()

        let infoUser = await signInWithPopup(auth, googleProvider)  
                                .then(userFirebase => userFirebase)
        const googleRef = doc(firestore, `/users/${infoUser.user.uid}` )
        setDoc(googleRef, { username: infoUser.user.displayName,  email: infoUser.user.email, admin: false, subscription: 1, subscriptionDate: Timestamp.fromDate(new Date()).toDate(), watchList: [], avatar: "https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg", active: true, rented: []  } )
    }

    const logout = () => signOut(auth)

    useEffect(()=>{
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)

        })
    }, [])


    return(
        <authContext.Provider value={{signup, login, logout, user, loading, loginWithGoogle }} >{children}</authContext.Provider>
    )
}

