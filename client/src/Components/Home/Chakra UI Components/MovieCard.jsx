import {
  Image,
  Box,
  WrapItem,
} from '@chakra-ui/react';

export default function MovieCard(props) {

  const { posterUrl, testId } = props;

  return (
    <WrapItem>
      <Box m='0' p='0'>
          <Image 
            boxSize='280' 
            borderRadius='10'
            opacity='.8'
            objectFit='cover' 
            src={posterUrl} alt='Dan Abramov' />
      </Box>
    </WrapItem>
  );
}