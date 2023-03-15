import classes from "./checkbox.module.css";
import { useContext } from "react";
import { consentContext } from "../../logic/context/consentContext";

export default function Checkbox() {
  // update consent
  const { consent, setConsent } = useContext(consentContext);
  const onCheck = (consentBool) => {
    var resultConsent = !consentBool;
    setConsent(resultConsent);
  };

  return (
    <div className={classes.list}>
      <div className={classes.marginLeft}>
        <input
          type="checkbox"
          id="scales"
          name="scales"
          onChange={() => onCheck(consent)}
        />
      </div>

      <label for="scales">
        Please confirm that you have read and understand the information above
        before uploading documents
      </label>
    </div>
  );
}
