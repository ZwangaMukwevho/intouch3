import classes from "./rowItem.module.css";
import { formatDate, getStatus } from "../../logic/data/format";
import { statusStyle } from "../../logic/status";
import { useRef } from "react";
import { download } from "../../logic/download.js";

export default function RowItemV2(props) {
  const status = getStatus(props.status);
  if (typeof window !== "undefined") {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    var width = windowSize.current[0];
  } else {
    var width = 500;
  }

  if (width <= 480) {
    return (
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
    );
  } else {
    return (
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
}
