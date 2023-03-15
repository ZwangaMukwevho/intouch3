import classes from "./tableHeader.module.css";
import { useRef, useEffect } from "react";
import useWindowSize from "../../logic/calculations/getWindowSize";

function tableHeader() {
  if (typeof window !== "undefined") {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    var width = windowSize.current[0];
  } else {
    var width = 500;
  }

  if (width <= 488) {
    return (
      <div className={classes.row}>
        <div id={classes.title}>
          <p>NAME</p>
        </div>
        <div id={classes.type}>
          <p>TYPE</p>
        </div>
        <div id={classes.date}>
          <p>DATE CREATED</p>
        </div>
        <div id={classes.status}>
          <p>STATUS</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.row}>
        <div id={classes.title}>
          <p>NAME</p>
        </div>
        <div id={classes.type}>
          <p>TYPE</p>
        </div>
        <div id={classes.date}>
          <p>DATE CREATED</p>
        </div>
        <div id={classes.status}>
          <p>STATUS</p>
        </div>
        <div id={classes.download}>
          <p>DOWNLOAD</p>
        </div>
      </div>
    );
  }
}

export default tableHeader;
