import axios from "axios";

async function fireBaseHandler(req, res) {
  const baseUrl =
    "https://react-getting-started-78f85-default-rtdb.firebaseio.com/checks.json";

  if (req.method === "POST") {
    const data = JSON.parse(req.body);

    // axios
    //   .post(baseUrl, {
    //     data,
    //   })
    //   .then((response) => console.log(result));
    try {
      console.log("uploading file");
      const result = await axios.post(baseUrl, { data });
      res.status(200).json({ message: "Dummy data inserted" });
      console.log("done");
    } catch (e) {
      result = "g";
      res.status(200).json({ message: "Dummy data inserted" });
      console.log(e);
    }
  }
}

export default fireBaseHandler;
