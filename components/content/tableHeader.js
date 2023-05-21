import classes from "./tableHeader.module.css";
import { useEffect, useState } from "react";

function TableHeader() {
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

  return width <= 488 ? (
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
  ) : (
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

export default TableHeader;
