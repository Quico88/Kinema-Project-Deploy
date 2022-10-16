import { Image, Box, WrapItem, Text, Center, useBoolean, Heading } from "@chakra-ui/react";

export default function Card({ posterUrl, id, title }) {
  const [hover, setHover] = useBoolean()
  return (
    <WrapItem >
        <Image
          boxSize=""
          borderRadius="10"
          opacity="1"
          objectFit="cover"
          src={posterUrl}
          alt=""
          transition="0.3s"
          _hover={{transform: 'scale(1.1)'}}  
        />
        
    </WrapItem>
  );
}
