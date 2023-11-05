import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("labrys_tech_task");
  switch (req.method) {
    case "POST":
      try {
        let crypto = req.body;
        await db.collection("favorites").insertOne(crypto);
        res.status(201).json({ message: "Document successfully inserted into favorites" });
      } catch (error) {
        console.error("Error parsing JSON data:", error);
        res.status(400).json({ error: "Invalid JSON data" });
      }
      break;
    case "GET":
      const allFavorites = await db.collection("favorites").find({}).toArray();
      res.json({ status: 200, data: allFavorites });
      break;
  }
}
