import classes from "./uploadDoc.module.css";
import DropzoneComponent from "../upload/dragAndDrop";
import UploadProvider from "../../logic/context/uploadProgressContext";
import { consentContext } from "../../logic/context/consentContext";
import { useContext } from "react";

function UploadDoc(props) {
  const { consent, setConsent } = useContext(consentContext);

  return consent ? (
    <UploadProvider>
      <div className={classes.infoPar}>
        <div className={classes.title}>
          <p>Drop your document here or click to browse</p>
        </div>
        <DropzoneComponent docType={props.docType} />
      </div>
    </UploadProvider>
  ) : (
    <UploadProvider>
      <div className={classes.infoPar}>
        <div className={classes.title}>
          <p>Accept consent checkbox in order to upload documents</p>
        </div>
      </div>
    </UploadProvider>
  );
}

export default UploadDoc;
