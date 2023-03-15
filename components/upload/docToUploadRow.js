import classes from "./docToUploadRow.module.css";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { DocsArrayContext } from "../../logic/context/uploadProgressContext";

export default function DocToUploadRow(props) {
  const { docsToUploadArr, setDocsToUploadArr } = useContext(DocsArrayContext);

  const removeDocFromArray = () => {
    // ✅ Remove object with id 2 from array
    setDocsToUploadArr((current) =>
      current.filter((obj) => {
        return obj.title !== props.title && obj.type !== props.type;
      })
    );
  };

  return (
    <div className={classes.row}>
      <div className={classes.title}>
        <p>{props.title}</p>
      </div>
      <div className={classes.type}>
        <p>{props.type}</p>
      </div>
      <div className={classes.download}>
        <IconButton
          color="info"
          sx={{ "&:hover": { color: "#ff0000", fontSize: "22px" } }}
          onClick={removeDocFromArray}
          role="button"
          disableRipple={true}
          children={
            <CancelOutlinedIcon
              fontSize="medium"
              color="disabled"
              sx={{ "&:hover": { color: "#ff0000", fontSize: "22px" } }}
            ></CancelOutlinedIcon>
          }
        ></IconButton>
      </div>
    </div>
  );
}
