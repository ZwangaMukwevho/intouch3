import ParentForm from "../../components/form/parentForm";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import SubmitButton from "../../components/form/submitButton";

function Confirmation() {
  const [email, setEmail] = useState("");
  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("items"));
    console.log(email);
    if (email) {
      setEmail(email);
    }
  }, []);

  const router = useRouter();
  const onSubmit = (event) => {
    localStorage.removeItem("items");
    router.push("/signin");
    event.preventDefault();
  };

  let confirmationMessage =
    "A verification link has been sent to your email address " + email;
  const confirmationForm = (
    <form onSubmit={onSubmit}>
      <SubmitButton type="submit" value="OK"></SubmitButton>
    </form>
  );

  return (
    <ParentForm
      infotagone={""}
      title={"Welcome to InTouch"}
      infotagtwo={
        <div>
          <p>{confirmationMessage}</p>
          <p>
            {"To proceed go and click on the verification link then sign in"}
          </p>
        </div>
      }
      form={confirmationForm}
    ></ParentForm>
  );
}

export default Confirmation;
