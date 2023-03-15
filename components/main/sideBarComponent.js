import classes from "./sideBarComponent.module.css";

function SideBarComponent(props) {
  return (
    <li className={classes.row}>
      {" "}
      <div id={classes.icon}>{props.icon}</div>
      <div id={classes.title}>{props.title}</div>
    </li>
  );
}

export default SideBarComponent;
