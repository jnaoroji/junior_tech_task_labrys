import { Card, CardBody } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {  Key, ReactNode, useState } from "react";
import { useRouter } from "next/router";
// import  useStore  from "../pages/crytostore";
interface QuoteData {
  BTC: {
    market_cap_dominance: string | number;
    price: number;
  };
  USD: {
    percent_change_24h: number;
  };
}
interface CryptoData {
  
  cmc_rank: string;
  symbol: string;
  name: string;
  market_cap_dominance: string | number;
  price: number;
  percent_change_24h: number;
  quote: QuoteData; 
  index: Key | number;
}

export default function Crypto({ data }: { data: CryptoData }) {

 
  const [favorites, setFavorites] = useState<CryptoData[]>([]);
  const router = useRouter(); // Create the router variable


  const addToFavorites = (crypto: CryptoData) => {
    setFavorites((prevFavorites) => [...prevFavorites, crypto]);
    
    fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( crypto ),
    })
      .then((response) => {
        if (response.status === 200 || 201) {
          // Request was successful
          console.log("Crypto added to favorites successfully.");
          router.push("/myTokens");
        } else {
          // Request failed, handle the error here
          console.error("Error adding crypto to favorites.");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };

  return (
    <div>
      {Array.isArray(data) && data.map((crypto: CryptoData, index: Key) => (
        <Card
          key={index}
          style={{ background: "black" }}
          onClick={() => addToFavorites(crypto)}
        >
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
                  <Text>#{crypto.cmc_rank}</Text>
                </Box>
                <Box display="flex" padding="10px">
                  <Text
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "blue",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      textTransform: "uppercase",
                    }}
                  >
                    {crypto.symbol[0]}
                  </Text>
                  {/* Displays only the first letter of symbol and has a blue background and circular shape to look like a logo*/}
                </Box>
                <Box display="flex" flexDir="column" marginTop={0}>
                  <Text
                    style={{
                      textTransform: "uppercase",
                    }}
                    marginBottom={0}
                  >
                    {crypto.name.slice(0, 3)}
                  </Text>
                  {/* Display the first three letters of name, transfromed uppercase */}
                  <Text marginTop={0}>
                    {crypto.quote.BTC.market_cap_dominance}
                  </Text>
                </Box>
                <Box display="flex" padding="10px">
                  <Text>${crypto.quote.BTC.price}</Text>
                </Box>
                <Box border-radius="4px" display="flex" padding="10px">
                  <Text style={{ color: "#24FF00" }}>{`${(
                    crypto.quote.USD.percent_change_24h * 100
                  ).toFixed(2)}%`}</Text>
                </Box>
              </Box>
            </Flex>
          </CardBody>
        </Card>
      ))}

    </div>
  );
}
