import { Alert, AlertIcon, AlertTitle, Button, Box } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import cleanError from '../../Redux/actions';
import Footer from '../Home/Chakra UI Components/Footer';
import NavBar from '../NavBar/NavBar.jsx';

const Error = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(cleanError());
    };
  }, []);

  const handleError = () => {
    window.history.back();
  };

  return (
    <Box>
      <NavBar />
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>
          Apologies. We have encountered an error. Please try again.
        </AlertTitle>
        <Button onClick={handleError}>Go back.</Button>
      </Alert>
      <Footer />
    </Box>
  );
};

export default Error;
