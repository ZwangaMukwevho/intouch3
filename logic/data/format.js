export function formatDate(timeString) {
  const index = timeString.indexOf("T");
  const timeCreated = timeString.replace(/-/g, " ").substring(0, index);
  const splitArr = timeCreated.split(" ");
  const date = new Date();
  date.setMonth(splitArr[1] - 1);
  const finalString =
    splitArr[2] +
    " " +
    date.toLocaleString("en-US", { month: "short" }) +
    " " +
    splitArr[0];
  return finalString;
}

export function getStatus(status) {
  switch (status) {
    case "processing":
      return "processing";
    case "declined":
      return "declined";
    case "certified":
      return "certified";
    default:
      "processing";
  }
}

export function formatFirebaseError(error) {
  switch (error) {
    case "Firebase: Error (auth/wrong-password).":
      return "Wrong password. Try again or click Forget Password to reset it";
    case "Success. The user is created in firebase":
      return "Firebase: Error (auth/email-already-in-use).";
    case "Firebase: Error (auth/email-already-in-use).":
      return "This email already is already registered as an account";
    case "Firebase: Error (auth/missing-email).":
      return "Email address is missing";
    case "Firebase: Error (auth/user-not-found).":
      return "Invalid or unknown email address entered";
    case "unverified":
      return "Email not verifieid. Click link sent to this email to verify account";
    case null:
      return "";
    default:
      return "Error logging in. Try again or contact support centre";
  }
}
