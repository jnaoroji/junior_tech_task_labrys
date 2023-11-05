// @ts-nocheck
import { Flex } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import Crypto from "../components/card";
import { MongoClient } from "mongodb";
import clientPromise from '../lib/mongodb';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

const inter = Inter({ subsets: ["latin"] });

type ConnectionStatus = {
  isConnected: boolean
}



export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise

    const res = await fetch(
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&sort=market_cap&cryptocurrency_type=all&tag=all&limit=10",
      {
        method: "GET",
        headers: {
          "X-CMC_PRO_API_KEY": process.env["API_KEY"] || "",
        },
      }
    );
    const coinsData = await res.json();
    
    return {
      props: { 
        isConnected: true, 
        data: coinsData.data,
      },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: true },
    }
  }
}
export default function Home({
  isConnected,
  data, // Include CoinMarketCap data in the props
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

 
  return (
        <Flex
          justify="center" // Center horizontally
          align="center" // Center vertically
          minHeight="100vh" // Ensure the container takes up the full viewport height
        >
          <Crypto data={data} />
        </Flex>
  );
}


