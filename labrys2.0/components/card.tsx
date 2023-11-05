import { Card, CardBody } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { useRouter } from "next/router";
import  useStore  from "../pages/crytostore";

export default function Crypto({ data }) {
  // console.log("Crypto", data);
  const [favorites, setFavorites] = useState([]);
  const router = useRouter(); // Create the router variable
  // const favoritesStore = useStore;

  const addToFavorites = (crypto) => {
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
  // const addToFavorites = (crypto: any) => {
  //   setFavorites((prevFavorites) => [...prevFavorites, crypto]);
  //   // favoritesStore.addToFavorites(crypto);
  //   // console.log(favorites);
  //   // Navigate to the myTokens page
  //   // router.push("/myTokens");
  //     fetch("/api/favorites", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ crypto }),
  //     });
  //   };
  

  return (
    <div>
      {data.map((crypto: { cmc_rank: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; symbol: (string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined)[]; name: string | any[]; quote: { BTC: { market_cap_dominance: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }; USD: { percent_change_24h: number; }; }; }, index: Key | null | undefined) => (
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

      <div>
        <h2>Favorites:</h2>
        <ul>
          {favorites.map((crypto, index) => (
            <li key={index}>
              {crypto.name} - {crypto.quote.USD.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
