import classes from "./rowItem.module.css";
import { statusStyle } from "../../logic/status.js";
import { download } from "../../logic/download.js";

function RowItem(props) {
  return (
    <div className={classes.row}>
      <div id={classes.title}>
        <p>{props.title}</p>
      </div>
      <div id={classes.type}>
        <p>{props.type}</p>
      </div>
      <div id={classes.date}>
        <p>{props.date}</p>
      </div>
      <div id={classes.status}>
        <p className={statusStyle(props.status)}>{props.status}</p>
      </div>
      <div id={classes.download}>
        <div>{download(props.status)}</div>
      </div>
    </div>
  );
}

export default RowItem;
