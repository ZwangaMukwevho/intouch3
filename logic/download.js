import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import DoNotDisturbOutlinedIcon from "@mui/icons-material/DoNotDisturbOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Button, Popup } from "semantic-ui-react";
import classes from "./download.module.css";
import IconButton from "@mui/material/IconButton";
import { getDownloadURL, deleteObject } from "firebase/storage";
import axios from "axios";
import { useContext, useState } from "react";
import { dbDocsContext } from "./context/dbDocs";

export function download(status, itemRef, fileName, docId) {
  const { dbDocs, setUpdateDocs } = useContext(dbDocsContext);
  const getDocDownloadURL = () => {
    getDownloadURL(itemRef).then((url) => {
      console.log("file url");
      console.log(url);

      axios({
        url: url, //your url
        method: "GET",
        responseType: "blob",
        headers: { "Access-Control-Allow-Origin": "*" },
        // important
      }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", fileName); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    });
  };

  function removeDocFromArray(id) {
    // ✅ Remove object with id from array
    setUpdateDocs(dbDocs.filter((item) => item.id !== id));
  }

  const [isOpen, setIsOpen] = useState(false);

  function invertIsOpen() {
    setIsOpen(!isOpen);
  }

  const closeIsOpen = () => {
    invertIsOpen();
  };

  const deleteFile = () => {
    console.log("delete called");
    invertIsOpen();
    removeDocFromArray(docId);
    // Delete the file
    deleteObject(itemRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  status = status.toLowerCase();
  switch (status) {
    case "processing":
      return (
        <div className={classes.certified}>
          <div id={classes.item}>
            <Popup
              content="Add users to your feed"
              trigger={
                <IconButton
                  color="info"
                  sx={{
                    "&:hover": { color: "#ff0000", fontSize: "22px" },
                    p: 0,
                  }}
                  onClick={getDocDownloadURL}
                  role="button"
                  children={
                    <DownloadForOfflineOutlinedIcon
                      fontSize="medium"
                      color="action"
                      sx={{
                        "&:hover": { color: "#333634", fontSize: "22px" },
                        p: 0,
                      }}
                    ></DownloadForOfflineOutlinedIcon>
                  }
                ></IconButton>
              }
              children={<p>Click button to download document</p>}
              on={["hover"]}
            />
          </div>
          <div id={classes.item2}>
            <Popup
              content="Add users to your feed"
              trigger={
                <IconButton
                  color="info"
                  sx={{
                    "&:hover": { color: "#ff0000", fontSize: "22px" },
                    p: 0,
                  }}
                  role="button"
                  children={
                    <DoNotDisturbOutlinedIcon
                      fontSize="medium"
                      color="action"
                      sx={{
                        "&:hover": { color: "#333634", fontSize: "22px" },
                        p: 0,
                        px: 0,
                      }}
                    ></DoNotDisturbOutlinedIcon>
                  }
                ></IconButton>
              }
              children={<p>Cannot delete document while still processing</p>}
              on={["hover"]}
            />
          </div>
        </div>
      );
    case "declined":
      return (
        <div className={classes.declined}>
          <HelpOutlineOutlinedIcon
            fontSize="medium"
            color="action"
            sx={{ "&:hover": { color: "#333634", fontSize: "22px" } }}
          ></HelpOutlineOutlinedIcon>
        </div>
      );

    case "certified":
      return (
        <div className={classes.certified}>
          <div id={classes.item}>
            <Popup
              content="Add users to your feed"
              trigger={
                <IconButton
                  color="info"
                  sx={{
                    "&:hover": { color: "#ff0000", fontSize: "22px" },
                    // p: 0,
                    p: 0,
                  }}
                  onClick={getDocDownloadURL}
                  role="button"
                  children={
                    <DownloadForOfflineOutlinedIcon
                      fontSize="medium"
                      color="action"
                      sx={{
                        "&:hover": { color: "#333634", fontSize: "22px" },
                        p: 0,
                      }}
                    ></DownloadForOfflineOutlinedIcon>
                  }
                ></IconButton>
              }
              children={<p>Click button to download document</p>}
              on={["hover"]}
            />
          </div>
          <div id={classes.item2}>
            <Popup
              content="Add users to your feed"
              trigger={
                <IconButton
                  color="info"
                  sx={{
                    "&:hover": { color: "#ff0000", fontSize: "22px" },
                    p: 0,
                  }}
                  role="button"
                  children={
                    <DeleteOutlinedIcon
                      fontSize="medium"
                      color="action"
                      sx={{
                        "&:hover": { color: "#333634", fontSize: "22px" },
                        p: 0,
                        px: 0,
                      }}
                    ></DeleteOutlinedIcon>
                  }
                ></IconButton>
              }
              children={
                <div className={classes.buttonColumn}>
                  Are you sure you want to delete
                  <button className={classes.button} onClick={deleteFile}>
                    {" "}
                    YES
                  </button>{" "}
                  <button className={classes.button2} onClick={closeIsOpen}>
                    {" "}
                    No
                  </button>
                </div>
              }
              open={isOpen}
              onClose={() => setIsOpen(!isOpen)}
              onOpen={() => setIsOpen(!isOpen)}
              on={["click"]}
            />
          </div>
        </div>
      );
  }
}
