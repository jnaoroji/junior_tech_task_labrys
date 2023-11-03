import { Card, CardBody } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

// https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest

// const API_KEY = "8b98703c-d8ba-47ee-8375-c96f56bd9223";

export default function Crypto({ rank, logo, symbol, marketCap, price, change }) {

  return (
    <Card style={{background: "black"}}>
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
              <Text>#1{rank}</Text>
            </Box>
            <Box display="flex" padding="10px">
              <Text>O{logo}</Text>
            </Box>
            <Box display="flex" flexDir="column" marginTop={0}>
              {/* <SkeletonCircle size="28px" /> ADD logo here*/}
              <Text marginBottom={0}>BTC{symbol}</Text>
              <Text marginTop={0}>510.21 Bn{marketCap}</Text>
            </Box>
            <Box display="flex" padding="10px">
              <Text>26,123.21{price}</Text>
            </Box>
            <Box border-radius="4px" display="flex" padding="10px">
              <Text>ICON{change}</Text>
            </Box>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
}