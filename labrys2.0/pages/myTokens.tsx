import { useState } from 'react';
import Crypto from '../components/card';
import useStore from './crytostore';
import { Flex } from "@chakra-ui/react";

export default function myTokens({favorites:any}) {
    // console.log('favorites', favorites);
//   const [selectedCards, setSelectedCards] = useState([]);

//   adds a card to the list
//   const handleCardClick = (cardData) => {
//     setSelectedCards([...selectedCards, cardData]);
//   };

  return (
    <div  style={{ color: "white" }}>
    <Flex
              justify="center" // Center horizontally
              align="center" // Center vertically
              direction="column"
              marginBottom={2}
            >
      <h1>My Tokens</h1>
      <div>
        <h2>Favorites:</h2>
        {/* <ul>
          {favorites.map((crypto, index) => (
            <li key={index}>
              {crypto.name} - {crypto.quote.USD.price}
            </li>
          ))}
        </ul> */}
      </div>
        </Flex>
      </div>
    
  );
}