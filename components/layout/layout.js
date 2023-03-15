import classes from "./layout.module.css";

function Layout(props) {
  return (
    <div>
      <div className={classes.main}>{props.children}</div>
    </div>
  );
}

export default Layout;
