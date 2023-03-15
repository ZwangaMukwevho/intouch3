import classes from "./dummyComp.module.css";
import React from "react";

function dummycomp() {
  return (
    <React.Fragment>
      <div className={classes.inputContainer}>
        <label>
          {" "}
          <b>Name & Surname</b>{" "}
        </label>
        <input
          className={classes.inputBox}
          type="text"
          name="uname"
          required
          placeholder="Enter your full name here"
        />
      </div>
    </React.Fragment>
  );
}

export default dummycomp;
