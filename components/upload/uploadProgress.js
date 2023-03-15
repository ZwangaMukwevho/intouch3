import classes from "./uploadProgress.module.css";
import FingerprintRoundedIcon from "@mui/icons-material/FingerprintRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import AvTimerRoundedIcon from "@mui/icons-material/AvTimerRounded";
import StepProgressBar from "react-step-progress";
import { useContext, useState } from "react";
import {
  UseIDUploaded,
  UseDocUploaded,
  DocUploadedContext,
  IDuploadedContext,
} from "../../logic/context/uploadProgressContext";
// import the stylesheet
import "react-step-progress/dist/index.css";
import { DocsArrayContext } from "../../logic/context/uploadProgressContext";

function ImageProgress(props) {
  const step1Content = <h1></h1>;
  const step2Content = <h1></h1>;
  const step3Content = <h1></h1>;

  const { value, setValue } = useContext(IDuploadedContext);
  const { docStep, setDocStep } = useContext(DocUploadedContext);
  const { docsToUploadArr, setDocsToUploadArr } = useContext(DocsArrayContext);
  // var x = setIDUploaded(false);
  const [step, setStep] = useState(0);

  // setup step validators, will be called before proceeding to the next step4
  console.log("upload progress");
  console.log(props.docsToUploadArr.length);
  console.log(props.docsToUploadArr);
  function step1Validator() {
    console.log("in validator");
    console.log(props.docsToUploadArr.length);
    console.log(props.docsToUploadArr);
    if (props.docsToUploadArr.length >= 1) {
      return true;
    }
    return false;
  }

  function step2Validator() {
    console.log(props.docsToUploadArr.length);
    console.log(props.docsToUploadArr);
    if (props.docsToUploadArr.length >= 2) {
      return true;
    }
    return false;
  }

  function step3Validator() {
    return false;
  }
  return (
    <div className="">
      <StepProgressBar
        startingStep={0}
        steps={[
          {
            label: "Upoad Scanned Document",
            name: "Briefing1",
            content: step1Content,
            validator: step1Validator,
          },
          {
            label: "Upload picture of yourself holding your ID",
            name: "Image-Acquisition",
            content: step2Content,
            validator: step2Validator,
          },
          {
            label: "Documents have been uploaded",
            name: "Finish",
            content: step3Content,
            validator: step3Validator,
          },
        ]}
      />
      <h1>{props.docsToUploadArr.length}</h1>
      {/* <button onClick={() => setValue("hey")}>change value</button>
      <button onClick={() => setDocStep(true)}>change value1</button> */}
    </div>
  );
}

export default ImageProgress;
