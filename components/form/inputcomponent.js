import classes from "./inputComponent.module.css";

function InputComponent(props) {
  return (
    <div className={classes.inputContainer}>
      <label>
        {" "}
        <b>{props.title}</b>{" "}
      </label>
      <input
        className={classes.inputBox}
        type={props.type}
        required
        placeholder={props.placeholder}
        value={props.value}
        // onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
}

export default InputComponent;
