
import Image from 'next/image'
import Crypto from '../components/card';
import { Flex } from "@chakra-ui/react";
const API_KEY = "8b98703c-d8ba-47ee-8375-c96f56bd9223";


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
async function getData() {
  console.log(process.env["X-CMC_PRO_API_KEY"]);

  const res = await fetch('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&sort=market_cap&cryptocurrency_type=all&tag=all&limit=10', {
      method: 'GET',
      headers: {
          'X-CMC_PRO_API_KEY': process.env["X-CMC_PRO_API_KEY"]|| "",
      },
      });

      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
     
      return res.json();
    
    }