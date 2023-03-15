import { rtDatabase } from "../config/firebaseConfig";
import { ref, set, get, child } from "firebase/database";

set(ref(rtDatabase, "users/" + "sass"), {
  fullName: "fullName",
  email: "email",
  profilePictureURL: "profilePictureURL",
  IDNumber: "IDNumber",
  phoneNumber: "phoneNumber",
});

function WriteUserData(
  userId,
  fullName,
  email,
  profilePictureURL,
  IDNumber,
  phoneNumber
) {
  set(ref(rtDatabase, "users/" + userId), {
    fullName: fullName,
    email: email,
    profilePictureURL: profilePictureURL,
    IDNumber: IDNumber,
    phoneNumber: phoneNumber,
  });
}

export function ReadUserData(userId) {
  get(child(rtDatabase, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        return snapshot.val;
      } else {
        console.log("No data available");
        return {};
      }
    })
    .catch((error) => {
      console.error(error);
      return {};
    });
}

export default WriteUserData;
