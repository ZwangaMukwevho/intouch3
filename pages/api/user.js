import { DoesUserExist } from "logic/data/rtReadUserData";

async function getUser(req, res) {
  const data = req.body;
  const query = req.query;

  if (req.method === "GET") {
    const uid = query.uid;
    const userExists = await DoesUserExist(uid);
    console.log(userExists);
    res.status(200).json({ userExists: query });
  }

  if (req.method === "POST") {
    try {
      console.log("uploading file");
      res.status(200).json({ message: "Dummy data inserted" });
      console.log("done");
    } catch (e) {
      result = "g";
      res.status(200).json({ message: "Dummy data inserted" });
      console.log(e);
    }
  }
}

export default getUser;
