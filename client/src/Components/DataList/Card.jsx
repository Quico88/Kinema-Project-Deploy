import { Image, Box, WrapItem } from "@chakra-ui/react";

export default function Card({ posterUrl, id }) {
  return (
    <WrapItem>
      <Box m="0" p="0">
        <Image
          boxSize=""
          borderRadius="10"
          opacity=".8"
          objectFit="cover"
          src={posterUrl}
          alt=""
        />
      </Box>
    </WrapItem>
  );
}
