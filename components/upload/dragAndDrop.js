import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import classes from "./dragAndDrop.module.css";
import Storage from "../../logic/config/firebaseConfig.js";
import { DocsArrayContext } from "../../logic/context/uploadProgressContext";
import StepProgressBar from "react-step-progress";
import DocsToUpload from "./docsToUpload";
import { useContext, useEffect, useRef } from "react";
import Loader from "../../components/upload/loader.js";
import {
  ref,
  uploadBytesResumable,
  uploadString,
  updateMetadata,
} from "firebase/storage";

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

function DropzoneComponent(props) {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  // const [docsToUploadArr, setDocsToUploadArr] = useState([]);
  const { docsToUploadArr, setDocsToUploadArr } = useContext(DocsArrayContext);

  //  Checks if file is allowed
  function isFileAllowed(fileObject) {
    if (fileObject.length > 0) {
      setError("");
    } else {
      return setError("Only .jepg, .png, .jpg  or  .pdf files are allowed");
    }
  }

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
  function step1Validator() {
    if (prevCount.current >= 1) {
      return true;
    }
    return false;
  }

  function step2Validator() {
    if (prevCount.current >= 2) {
      return true;
    }
    return false;
  }

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

  const step1Content = <h1></h1>;
  const step2Content = <h1></h1>;
  const step3Content = <h1></h1>;

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
      <div className="">
        <StepProgressBar
          startingStep={0}
          onSubmit={onFormSubmit}
          steps={[
            {
              label: "Scanned Document",
              name: "Briefing1",
              content: step1Content,
              validator: step1Validator,
            },
            {
              label: "picture of yourself holding your ID",
              name: "Image-Acquisition",
              content: step2Content,
              validator: step2Validator,
            },
            {
              label: "Uploaded Done",
              name: "Finish",
              content: step3Content,
            },
          ]}
        />
      </div>
    </>
  );
}

export default DropzoneComponent;
