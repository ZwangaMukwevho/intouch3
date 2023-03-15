import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://intouch:intouch@cluster0.t0qzugt.mongodb.net/dummy?retryWrites=true&w=majority"
    );

    const db = client.db();

    const dummyCOllection = db.collection("dummyCollection");

    const result = await dummyCOllection.insertOne(data);
    console.log(result);

    client.close();

    res.status(200).json({ message: "Dummy data inserted" });
  }
}

export default handler;
