import classes from "./docsToUpload.module.css";
import DocToUploadRow from "./docToUploadRow.js";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { DocsArrayContext } from "../../logic/context/uploadProgressContext";

export default function DocsToUpload() {
  const { docsToUploadArr, setDocsToUploadArr } = useContext(DocsArrayContext);

  const removeDocFromArray = (id) => {
    // ✅ Remove object with id from array
    setDocsToUploadArr(docsToUploadArr.filter((item) => item.id !== id));
  };

  const docsList = docsToUploadArr.map((doc, i) => {
    return (
      <div key={i} className={classes.row}>
        <div className={classes.docTitle}>
          <p>{doc.name}</p>
        </div>
        <div className={classes.categoryTitle}>
          <div>{doc.documentType}</div>
        </div>
        <div className={classes.download}>
          <IconButton
            color="info"
            sx={{ "&:hover": { color: "#ff0000", fontSize: "22px" } }}
            onClick={() => {
              removeDocFromArray(doc.id);
            }}
            role="button"
            disableRipple={true}
            /* eslint-disable */
            children={
              <CancelOutlinedIcon
                fontSize="medium"
                color="disabled"
                sx={{ "&:hover": { color: "#ff0000", fontSize: "22px" } }}
              ></CancelOutlinedIcon>
            }
            /* eslint-enable */
          ></IconButton>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className={classes.title}>
        <p>Documents To Upload</p>
      </div>
      <i className={classes.italics}>
        Ensure you have selected the document type from above dropdown
      </i>
      <div className={classes.outerBorder}>{docsList}</div>
    </>
  );
}
