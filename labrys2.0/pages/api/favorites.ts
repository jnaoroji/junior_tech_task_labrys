// @ts-nocheck
import clientPromise from "../../lib/mongodb";
const { ObjectId } = require('mongodb');

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("labrys_tech_task");
  switch (req.method) {
    case "POST":
      try {
        let crypto = req.body;
        await db.collection("favorites").insertOne(crypto);
        res
          .status(201)
          .json({ message: "Document successfully inserted into favorites" });
      } catch (error) {
        console.error("Error parsing JSON data:", error);
        res.status(400).json({ error: "Invalid JSON data" });
      }
      break;
    case "GET":
      const allFavorites = await db.collection("favorites").find({}).toArray();
      res.json({ status: 200, data: allFavorites });
      break;

      case "DELETE":
        try {
          const favoriteId = req.query.id;
      
          // Check if the provided favoriteId is a valid ObjectId
          if (!ObjectId.isValid(favoriteId)) {
            return res.status(400).json({ error: "Invalid favoriteId format" });
          }
      
          const favoriteObjectId = new ObjectId(favoriteId);
      
          const deletedFavorite = await db
            .collection("favorites")
            .deleteOne({ _id: favoriteObjectId });
      
          if (deletedFavorite.deletedCount === 0) {
            return res.status(404).json({ error: "Favorite not found" });
          }
          res.json({ message: "Favorite deleted successfully" });
        } catch (error) {
          console.error("Error deleting favorite:", error);
          res.status(500).json({ error: "Could not delete favorite" });
        }
        break;

    default:
      res.status(405).end(); // Method Not Allowed
  }
}
