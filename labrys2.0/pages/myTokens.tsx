import { useState, useEffect } from 'react';
import Crypto from '../components/card';
import useStore from './crytostore';
import { Flex } from "@chakra-ui/react";

export default function myTokens() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/api/favorites")
      .then((response) => response.json())
      .then((data) => {
        setFavorites(data.data); // Access the "data" property to set favorites
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div style={{ color: "white" }}>
      <Flex
        justify="center"
        align="center"
        direction="column"
        marginBottom={2}
      >
        <h1>My Favourite Tokens</h1>
        <div>
          <ul>
            {favorites.map((crypto, index) => (
              <li key={index}>
                {crypto.name} - {crypto.quote.USD.price}
              </li>
            ))}
          </ul>
        </div>
      </Flex>
    </div>
  );
}
