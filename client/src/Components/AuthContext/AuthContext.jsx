import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { auth, firestore } from './firebase';
import { useDispatch } from 'react-redux';
import { loadUserData, logOutUser } from '../../Redux/actions';
import welcomeEmail from './welcomeEmail';
import { useToast, Box, Text, Button, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../Assets/logo.png';

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error('There is not auth context');
  return context;
};

export default function AuthProvider({ children }) {
  const [loadingUser, setLoadingUser] = useState(true);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stateInactive, setStateInactive] = useState(false);

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
      stripeId: '',
      avatar:
        'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
      avatars: [
        'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
      ],
      active: true,
      banned: false,
      rented: [],
    });
    await axios.post('/email', {
      email: userEmail,
      user: displayName,
    });
    dispatch(loadUserData(infoUser.user.uid));
  };

  const login = async (email, password) => {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const docRef = doc(firestore, `/users/${userCredentials.user.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      if (userData.banned) {
        toast({
          title: 'You have been banned.',
          description:
            'For any complaint or further information please contact our crew.',
          status: 'error',
          duration: 3000,
          position: 'top-center',
          isClosable: true,
        });
      } else if (!userData.active) {
        setStateInactive(true);
      } else {
        dispatch(loadUserData(userCredentials.user.uid));
        navigate('/home');
      }
    }
  };

  const signupWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    let infoUser = await signInWithPopup(auth, googleProvider).then(
      (userFirebase) => userFirebase
    );

    const googleRef = doc(firestore, `/users/${infoUser.user.uid}`);
    const docSnap = await getDoc(googleRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      if (userData.banned) {
        toast({
          title: 'You have been banned.',
          description:
            'For any complaint or further information please contact our crew.',
          status: 'error',
          duration: 3000,
          position: 'top-center',
          isClosable: true,
        });
      } else if (!userData.active) {
        setStateInactive(true);
      } else {
        dispatch(loadUserData(infoUser.user.uid));
        setTimeout(() => navigate('/home'), 500);
      }
    } else {
      setDoc(googleRef, {
        username: infoUser.user.displayName,
        email: infoUser.user.email,
        admin: false,
        subscription: 1,
        subscriptionDate: Timestamp.fromDate(new Date()).toDate(),
        watchList: [],
        stripeId: '',
        avatar: infoUser.user.photoURL,
        avatars: [infoUser.user.photoURL],
        active: true,
        banned: false,
        rented: [],
      });
      await axios.post('/email', {
        email: infoUser.user.email,
        user: infoUser.user.displayName,
      });

      dispatch(loadUserData(infoUser.user.uid));
    }
  };

  const logout = () => {
    signOut(auth);
    dispatch(logOutUser());
  };

  function forgotPasswordFunction(email) {
    return sendPasswordResetEmail(auth, email);
  }

  async function read(id) {
    const docRef = doc(firestore, `/users/${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      return data;
    }
  }

  const cancelActivateAcc = () => {
    setStateInactive(false);
  };

  const activateAcc = async () => {
    const userRef = doc(firestore, `/users/${user.uid}`);
    await updateDoc(userRef, {
      active: true,
    });
    toast({
      title: 'You can now have access to your account.',
      description: 'Please login.',
      status: 'success',
      duration: 3000,
      position: 'top-center',
      isClosable: true,
    });
    setStateInactive(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingUser(false);
    });
  }, []);

  if (stateInactive)
    return (
      <Box
        alignItems={'center'}
        display="flex"
        justifyContent="center"
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
        height={'100vh'}
        backgroundSize={'cover'}
        backgroundImage={
          'linear-gradient(180deg, #0000008c 20%, #0000008c 100%), url(https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/12/14/5fd73c24bebce.jpeg)'
        }
      >
        <Box
          height={[300, 300, 300]}
          bg={'rgba(17, 173, 152, 0.3)'}
          backdropFilter={'blur(10px)'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
        >
          <Box display={'flex'} textAlign={'center'} alignItems={'center'}>
            <Image
              boxSize={'200px'}
              objectFit={'cover'}
              alt={'kinema-logo'}
              src={logo}
            />
            <Text color={'white'}>
              You are no longer subscribed. Do you want to recover your account
              with all your previous data?
            </Text>
          </Box>
          <Box
            display={'flex'}
            textAlign={'center'}
            alignItems={'center'}
            justifyContent={'space-around'}
          >
            <Button colorScheme={'green'} onClick={activateAcc}>
              Accept
            </Button>
            <Button colorScheme={'red'} onClick={cancelActivateAcc}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    );

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        logout,
        user,
        loadingUser,
        signupWithGoogle,
        forgotPasswordFunction,
        read,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
