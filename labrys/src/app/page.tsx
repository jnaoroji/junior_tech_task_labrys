import Image from 'next/image'
import Crypto from '../components/card';
import { Flex } from "@chakra-ui/react";


export default function Home() {

  
  return (
    <Flex
      justify="center" // Center horizontally
      align="center" // Center vertically
      height="100vh" // Ensure the container takes up the full viewport height
    >
  <Crypto/>
  </Flex>
  )
}
