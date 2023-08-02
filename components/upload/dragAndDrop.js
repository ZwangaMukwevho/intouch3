import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import classes from "./dragAndDrop.module.css";
import Storage from "../../logic/config/firebaseConfig.js";
import { DocsArrayContext } from "../../logic/context/uploadProgressContext";
import DocsToUpload from "./docsToUpload";
import { useContext, useEffect, useRef } from "react";
import Loader from "../../components/upload/loader.js";
import {
  ref,
  uploadBytesResumable,
  uploadString,
  updateMetadata,
} from "firebase/storage";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const steps = [
  "upload picture of yourself holding an your id",
  "upload document to certify",
  "Submit",
];

function DropzoneComponent(props) {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const { docsToUploadArr, setDocsToUploadArr } = useContext(DocsArrayContext);
  const [disable, setDisable] = useState(false);

  //  Checks if file is allowed
  function isFileAllowed(fileObject) {
    if (fileObject.length > 0) {
      setError("");
    } else {
      return setError("Only .jepg, .png, .jpg  or  .pdf files are allowed");
    }
  }

  var item;
  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // setLoader(true);

        // Update docs to upload array
        item = {
          name: file.name,
          documentType: props.docType,
          id: file.name.concat(props.docType),
          status: "uploading",
          binaryStr: reader.result,
        };

        setDocsToUploadArr([...docsToUploadArr, item]);
      };
      reader.readAsDataURL(file);
    });

    isFileAllowed(acceptedFiles);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "application/pdf": [],
    },
    disabled: disable,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const prevCount = useRef(0);

  function onFormSubmit() {
    setLoader(true);

    const id = JSON.parse(localStorage.getItem("id"));
    localStorage.getItem("items");
    for (let i = 0; i < docsToUploadArr.length; ++i) {
      var file = docsToUploadArr[i];
      const storageRef = ref(Storage, `drag/${id}/${file.name}`);
      uploadString(storageRef, file.binaryStr, "data_url").then((snapshot) => {
        const newMetadata = {
          customMetadata: {
            documentType: file.documentType,
            status: "certified",
          },
        };
        updateMetadata(storageRef, newMetadata)
          .then((metadata) => {
            setLoader(false);
          })
          .catch((error) => {
            setLoader(false);
            setError(
              "An error occurred when uploading your file. Please retry upload"
            );
          });
      });
    }
    setDocsToUploadArr([]);
  }

  useEffect(() => {
    prevCount.current = docsToUploadArr.length;
  }, [docsToUploadArr]);

  // Step progress bar logic
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 20;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    onFormSubmit();
  };

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#784af4",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#784af4",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const isStepFailed = (step) => {
    if (prevCount.current === step && step !== 2) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className={classes.loader}>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <div>Drag and drop your images here</div>
          <div id="icon">
            <UploadFileIcon
              fontSize="large"
              color="action"
              sx={{ "&:hover": { color: "#333634" } }}
            ></UploadFileIcon>{" "}
          </div>
          <div>Click icon to upload file</div>
        </div>
        <div>
          <p className={classes.errorMessage}>{error}</p>
        </div>
        <div className={classes.loader}>
          <Loader bool={loader} />
        </div>
      </div>
      <DocsToUpload />
      <div className={classes.margin}>
        <Box sx={{ width: "100%" }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            connector={<QontoConnector />}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              if (isStepFailed(index)) {
                labelProps.optional = (
                  <Typography variant="caption" color="error">
                    upload document
                  </Typography>
                );

                labelProps.error = true;
              }

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>
                    <div className={classes.stepperLabel}>{label}</div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length - 1 ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All documents uploaded - click submit
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  variant="contained"
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button variant="outlined" onClick={handleReset}>
                  Submit
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                click step done to activate next button
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  variant="contained"
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                {prevCount.current <= activeStep ? (
                  <Button variant="contained" onClick={handleNext} disabled>
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Box>
        <Button variant="contained">step done</Button>
      </div>
    </>
  );
}

export default DropzoneComponent;
