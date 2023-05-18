import classes from "./parentform.module.css";

function ParentForm(props) {
  const infoStyle = {
    // alignelf: 'flex-start',
    color: "#808080",
    padding: 0,
    margin: 0,
    marginBottom: 40,
    marginTop: 0,
    fontSize: 12,
  };

  return (
    <div className={classes.app}>
      <div className={classes.loginForm}>
        <div style={classes.infoStyle}>{props.infotagone}</div>
        <p className={classes.title}>{props.title}</p>
        <p style={classes.infoStyle}>{props.infotagtwo}</p>
        <div>{props.form}</div>
      </div>
    </div>
  );
}

export default ParentForm;
