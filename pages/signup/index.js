import ParentForm from "../../components/form/parentForm";
import Link from "next/link";
import { useAuthUserContext } from "../../logic/context/authUserContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classes from "./signup.module.css";
import SpinnerLoader from "../../components/upload/spinnerLoader";
import { formatFirebaseError } from "../../logic/data/format";
import WriteUserData from "../../logic/data/readAndWriteRTDB";

function SignUp() {
  const [email, setEmail] = useState("");
  const [nameAndSurname, setNameAndSurname] = useState("");
  const [IDNumber, setIDNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(email));
  }, [email]);

  //Optional error handling
  const [error, setError] = useState(null);

  const { signUp, sendVerification } = useAuthUserContext();

  const onSubmit = (event) => {
    setLoader(true);
    setError(null);
    if (passwordOne === passwordTwo)
      signUp(email, passwordOne)
        .then((authUser) => {
          //   console.log(
          //     `Success. The user is created in firebase: ${JSON.stringify(
          //       authUser
          //     )}`
          //   );

          router.push("/confirmation");

          // send email verification link
          sendVerification()
            .then(() => {
              // Email verification sent!
              // ...
            })
            .catch((error) => {
              console.log(error);
              setError(error.message);
            });

          WriteUserData(
            authUser.user.uid,
            nameAndSurname,
            email,
            "",
            IDNumber,
            phoneNumber
          );

          setLoader(false);
        })

        .catch((error) => {
          setError(error.message);
          setLoader(false);
        });
    else {
      setError("Password do not match");
      setLoader(false);
    }
    event.preventDefault();
  };

  const renderForm = (
    <form onSubmit={onSubmit}>
      <div>
        <div className={classes.inputContainer}>
          <label>
            {" "}
            <b>{"Full Name"}</b>{" "}
          </label>
          <input
            className={classes.inputBox}
            type="text"
            required
            placeholder={"Enter your full name here"}
            value={nameAndSurname}
            onChange={(event) => setNameAndSurname(event.target.value)}
            id="signUpFullName"
          />
        </div>

        <div className={classes.inputContainer}>
          <label>
            {" "}
            <b>{"ID Number"}</b>{" "}
          </label>
          <input
            className={classes.inputBox}
            type="text"
            required
            placeholder={"Enter your ID number here"}
            value={IDNumber}
            onChange={(event) => setIDNumber(event.target.value)}
            id="signUpIDNumber"
          />
        </div>

        <div className={classes.inputContainer}>
          <label>
            {" "}
            <b>{"Email Address"}</b>{" "}
          </label>
          <input
            className={classes.inputBox}
            type="email"
            required
            placeholder={"Enter your email address here"}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            id="signUpEmail"
          />
        </div>

        <div className={classes.inputContainer}>
          <label>
            {" "}
            <b>{"Phone Number"}</b>{" "}
          </label>
          <input
            className={classes.inputBox}
            type="text"
            required
            placeholder={"Enter your phone number here"}
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            id="signUpFullName"
          />
        </div>

        <div className={classes.inputContainer}>
          <label>
            {" "}
            <b>{"Password"}</b>{" "}
          </label>
          <input
            className={classes.inputBox}
            type="Password"
            required
            placeholder={"Enter your password here"}
            value={passwordOne}
            onChange={(event) => setPasswordOne(event.target.value)}
            id="signUpPassword"
          />
        </div>

        <div className={classes.inputContainer}>
          <label>
            {" "}
            <b>{"Confirm Password"}</b>{" "}
          </label>
          <input
            className={classes.inputBox}
            type="Password"
            required
            placeholder={"Confirm your password here"}
            value={passwordTwo}
            onChange={(event) => setPasswordTwo(event.target.value)}
            id="signUpPassword2"
          />
        </div>
        <div>
          <p className={classes.errorMessage}>{formatFirebaseError(error)}</p>
        </div>
        <SpinnerLoader bool={loader}></SpinnerLoader>

        <div className={classes.inputContainer}>
          <input
            className={classes.buttonBox}
            type="submit"
            value="Create your account"
          />
        </div>
      </div>
    </form>
  );

  return (
    <ParentForm
      infotagone={
        <div>
          Have an account already? <Link href="/signin">Login here</Link>
        </div>
      }
      title={"Welcome to InTouch"}
      infotagtwo={"Enter your credentials to gain access to the platform"}
      form={renderForm}
    ></ParentForm>
  );
}

export default SignUp;
