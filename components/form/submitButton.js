import classes from "./inputComponent.module.css";

function SubmitButton(props) {
  return (
    <div className={classes.inputContainer}>
      <input
        className={classes.buttonBox}
        type={props.type}
        value={props.value}
      />
    </div>
  );
}

export default SubmitButton;
