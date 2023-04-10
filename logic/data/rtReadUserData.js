import { rtDatabase } from "../config/firebaseConfig";
import { ref, onValue, get, child } from "firebase/database";

async function ReadUserData(userId) {
  get(child(rtDatabase, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        console.log("false");
        return snapshot.val;
      } else {
        console.log("true");
        console.log("No data available");
        return {};
      }
    })
    .catch((error) => {
      console.error(error);
      return {};
    });
}

export async function DoesUserExist(userId) {
  return onValue(
    ref(rtDatabase, `users/${userId}`),
    (snapshot) => {
      const username =
        (snapshot.val() && snapshot.val().fullName) || "Anonymous";
      // ...
    },
    {
      onlyOnce: true,
    }
  );
}
