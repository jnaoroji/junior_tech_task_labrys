
import { Flex } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import Crypto from "../components/card";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  // console.log(props?.data);
 
  return (
        <Flex
          justify="center" // Center horizontally
          align="center" // Center vertically
          minHeight="100vh" // Ensure the container takes up the full viewport height
        >
          <Crypto data={props.data} />
        </Flex>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&sort=market_cap&cryptocurrency_type=all&tag=all&limit=10",
    {
      method: "GET",
      headers: {
        "X-CMC_PRO_API_KEY": process.env["X-CMC_PRO_API_KEY"] || "",
      },
    }
  );
  const coinsData = await res.json();
  // console.log(coinsData.data);
  //gives you cmc_rank, name, symbol, quote
  // console.log(coinsData.data[0]?.quote);
  // gives you price, volume_24h, percent_change_1h, percent_change_24h, market_cap
  return {
    props: {
      data: coinsData.data,
    },
  };
};
