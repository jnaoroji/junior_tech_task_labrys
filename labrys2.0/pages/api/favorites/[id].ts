// @ts-nocheck
import clientPromise from "../../../lib/mongodb";
const { ObjectId } = require("mongodb");

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("labrys_tech_task");
  switch (req.method) {
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
