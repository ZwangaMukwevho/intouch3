import ParentForm from "../../components/form/parentForm";
import Link from "next/link";
import SubmitButton from "../../components/form/submitButton";
import { useState, useEffect } from "react";
import { useAuthUserContext } from "../../logic/context/authUserContext";
import { useRouter } from "next/router";
import classes from "./signin.module.css";
import { formatFirebaseError } from "../../logic/data/format";
import SpinnerLoader from "../../components/upload/spinnerLoader";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { signIn, resetPassword } = useAuthUserContext();
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const onSubmit = (event) => {
    setLoader(true);
    setError(null);
    signIn(email, password)
      .then((authUser) => {
        console.log(authUser.user.emailVerified);
        localStorage.setItem("id", JSON.stringify(authUser.user.uid));
        // console.log("user");
        // console.log(authUser);
        // console.log("user");
        // console.log(authUser.user.uid);
        if (authUser.user.emailVerified) {
          router.push("/home");
          setLoader(false);
        } else {
          setLoader(false);
          setError("unverified");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
        setError(error.message);
        setLoader(false);
      });
    event.preventDefault();
  };

  const resetEmailPassword = () => {
    setLoader(true);
    resetPassword(email)
      .then(() => {
        setError(null);
        setLoader(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoader(false);
      });
  };

  useEffect(() => {
    // Prefetch the home page
    router.prefetch("/home");
  }, []);

  const renderForm = (
    <form onSubmit={onSubmit}>
      <div>
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
            <b>{"Password"}</b>{" "}
          </label>
          <input
            className={classes.inputBox}
            type="Password"
            required
            placeholder={"Enter your password here"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="loginPassword"
          />
        </div>
        <div>
          <p className={classes.errorMessage}>{formatFirebaseError(error)}</p>
        </div>
        <SpinnerLoader bool={loader}></SpinnerLoader>
        <SubmitButton type="submit" value="Sign in"></SubmitButton>
        <div className={classes.inputContainer}>
          <input
            className={classes.normalButtonBox}
            type="button"
            value="Forgot password"
            onClick={resetEmailPassword}
          />
        </div>
      </div>
    </form>
  );

  return (
    <ParentForm
      infotagone={
        <div>
          Don't have an account already?{" "}
          <Link
            href="/signup"
            style={{
              textDecoration: "underline",
              color: "blue",
            }}
          >
            Sign up
          </Link>
        </div>
      }
      title={"Welcome to InTouch"}
      infotagtwo={"Enter your credentials to gain access to the platform"}
      form={renderForm}
    ></ParentForm>
  );
}

export default SignIn;
