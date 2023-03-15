import classes from "./tablecontents.module.css";
export function statusStyle(statusProp) {
  statusProp = statusProp.toLowerCase();

  switch (statusProp) {
    case "processing":
      return classes.statusGrey;
    case "declined":
      return classes.statusRed;
    case "certified":
      return classes.statusGreen;
  }
}
