import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { auth, firestore } from "./firebase";
import { useDispatch } from "react-redux";
import { loadUserData, logOutUser } from "../../Redux/actions";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth context");
  return context;
};

export default function AuthProvider({ children }) {
  const [loadingUser, setLoadingUser] = useState(true);
  const dispatch = useDispatch()

  const [user, setUser] = useState(null);

  const signup = async (userEmail, password, displayName) => {
    let infoUser = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      password,
      displayName
    ).then((userFirebase) => userFirebase);
    const docRef = doc(firestore, `/users/${infoUser.user.uid}`);
    setDoc(docRef, {
      username: displayName,
      email: userEmail,
      admin: false,
      subscription: 1,
      subscriptionDate: Timestamp.fromDate(new Date()).toDate(),
      watchList: [],
      avatar:
        "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
      active: true,
      rented: [],
    });
    dispatch(loadUserData(infoUser.user.uid));
  };

  const login = async (email, password) => {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(loadUserData(userCredentials.user.uid));
  };

  const signupWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    let infoUser = await signInWithPopup(auth, googleProvider).then(
      (userFirebase) => userFirebase
    );
    const googleRef = doc(firestore, `/users/${infoUser.user.uid}`);
    setDoc(googleRef, {
      username: infoUser.user.displayName,
      email: infoUser.user.email,
      admin: false,
      subscription: 1,
      subscriptionDate: Timestamp.fromDate(new Date()).toDate(),
      watchList: [],
      avatar: infoUser.user.photoURL,
      active: true,
      rented: [],
    });
    dispatch(loadUserData(infoUser.user.uid));
  };

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    const data = await signInWithPopup(auth, googleProvider);
    dispatch(loadUserData(data.user.uid));
  };

  const logout = () => {
    signOut(auth)
    dispatch(logOutUser());
  }

  const updateUserInfo = async (img, userName) => {
    let docu = user;
    const userRef = doc(firestore, `/users/${docu.user.uid}`);
    await updateDoc(userRef, { username: userName, avatar: img });
  };

  async function read(id) {
    const docRef = doc(firestore, `/users/${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      return data;
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingUser(false);
    });
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        logout,
        user,
        loadingUser,
        loginWithGoogle,
        signupWithGoogle,
        read,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
