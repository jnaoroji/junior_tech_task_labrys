import { useState, useEffect } from 'react';
import { Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';


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
  
  const handleDeleteFavorite = async (favoriteId) => {
    const deleteUrl = `/api/favorites/${favoriteId}`;

  
    try {
      await fetch(deleteUrl, {
        method: 'DELETE',
      });
  
      // Remove the deleted favorite from the state
      setFavorites(favorites.filter((crypto) => crypto._id !== favoriteId));
    } catch (error) {
      console.error('Failed to delete favorite:', error);
    }
  };

  return (

      <Flex
        justify="center"
        align="center"
        direction="column"
        minHeight="100vh"
        marginBottom={2}
      >
        <h1 style={{ color: "white", marginBottom:"10px" }}><StarIcon style={{ color: "yellow"}}/>  My Favourite Tokens  <StarIcon style={{ color: "yellow"}}/></h1>
        <div>
          <ul>
            {favorites.map((crypto, index) => (
              <li key={index} style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ textTransform: "uppercase", color:"white" }}>
                {crypto.name.slice(0, 3)} - 
              </Text>
              <Text style={{ color: "#24FF00" }}> ${crypto.quote.BTC.price}</Text>
              <Button colorScheme='red' size='xs' variant='ghost'
              onClick={() => handleDeleteFavorite(crypto._id)}
              >
                Delete
              </Button>
             
            </li>
            ))}
          </ul>
        </div>
      </Flex>

  );
}
