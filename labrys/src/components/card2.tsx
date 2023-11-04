"use client";
import {useState, useEffect} from 'react';
import { Card, CardBody } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
const API_KEY = "8b98703c-d8ba-47ee-8375-c96f56bd9223";


export default function Crypto() {
  const [cryptoData, setCryptoData] = useState([]); // State to store crypto data
  console.log(cryptoData);
  
  
  // Fetch crypto data from CoinMarketCap's API
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("X-CMC_PRO_API_KEY", API_KEY);
    myHeaders.append("Accept", "*/*");

    fetch(
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&sort=market_cap&cryptocurrency_type=all&tag=all&limit=10",
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the parsed JSON data
        setCryptoData(data.data); // Store the data in the state
      })
      .catch((error) => console.log("error", error));
  }, []); // Empty dependency array to run the effect only once


  return (
    <div>
      {cryptoData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        cryptoData.map((crypto, index) => (
      
    <Card key={crypto.id} style={{background: "black"}}>
      <CardBody>
        <Flex
          justify="center" // Center horizontally
          align="center" // Center vertically
          direction="column"
          marginBottom={2}
        >
          <Box
            bg="#2F2E2E"
            w="366px"
            h="56px"
            top="-140px"
            left="-176px"
            // radius="4px"
            p={1}
            color="white"
            display="flex"
            alignItems="left"
            justifyContent="center"
            // border = "1px solid #800080"
          >
            <Box display="flex" padding="10px">
              <Text>#1{index+1}</Text>
            </Box>
            <Box display="flex" padding="10px">
              <Text>O{crypto.symbol}</Text>
            </Box>
            <Box display="flex" flexDir="column" marginTop={0}>
              {/* <SkeletonCircle size="28px" /> ADD logo here*/}
              <Text marginBottom={0}>BTC{crypto.name}</Text>
              <Text marginTop={0}>510.21 Bn{crypto.quote.USD.market_cap}</Text>
            </Box>
            <Box display="flex" padding="10px">
              <Text>26,123.21{crypto.quote.USD.price}</Text>
            </Box>
            <Box border-radius="4px" display="flex" padding="10px">
              <Text>ICON</Text>
            </Box>
          </Box>
        </Flex>
      </CardBody>
    </Card>
    ))
    )}
    </div>
  );
}


