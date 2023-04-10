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

export default WriteUserData;
