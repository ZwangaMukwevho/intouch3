import classes from "./rowItem.module.css";
import { formatDate, getStatus } from "../../logic/data/format";
import { statusStyle } from "../../logic/status";
import { useRef, useEffect, useState } from "react";
import { download } from "../../logic/download.js";

export default function RowItemV2(props) {
  const status = getStatus(props.status);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Update windowSize on initial mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width <= 480 ? (
    <>
      <div className={classes.row}>
        <div id={classes.title}>
          <div>{props.title}</div>
        </div>
        <div id={classes.type}>
          <div>{props.type}</div>
        </div>
        <div id={classes.date}>
          <div>{formatDate(props.date)}</div>
        </div>
        <div id={classes.status}>
          <div className={statusStyle(status)}>{status}</div>
        </div>
      </div>
      <div className={classes.downloadRow}>
        <div>{download(status, props.docRef, props.title, props.id)}</div>
      </div>
    </>
  ) : (
    <>
      <div className={classes.row}>
        <div id={classes.title}>
          <div>{props.title}</div>
        </div>
        <div id={classes.type}>
          <div>{props.type}</div>
        </div>
        <div id={classes.date}>
          <div>{formatDate(props.date)}</div>
        </div>
        <div id={classes.status}>
          <div className={statusStyle(status)}>{status}</div>
        </div>
        <div id={classes.download}>
          <div>{download(status, props.docRef, props.title, props.id)}</div>
        </div>
      </div>
    </>
  );
}
