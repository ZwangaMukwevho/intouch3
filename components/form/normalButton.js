import classes from "./inputComponent.module.css";

function NormalButton(props) {
  return (
    <div className={classes.inputContainer}>
      <input
        className={classes.normalButtonBox}
        type={props.type}
        value={props.value}
      />
    </div>
  );
}

export default NormalButton;
