// Loading Spinner
import { Oval } from "react-loader-spinner";
import classes from "./loader.module.css";

export default function SpinnerLoader(props) {
  return props.bool ? (
    <div className={classes.loaderDiv}>
      <Oval
        height="60"
        width="60"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  ) : null;
}
