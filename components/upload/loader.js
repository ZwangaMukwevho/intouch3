// Loading Spinner
import { Audio, MutatingDots } from "react-loader-spinner";
import classes from "./loader.module.css";

export default function Loader(props) {
  return props.bool ? (
    <div className={classes.loaderDiv}>
      <MutatingDots
        height="100"
        width="100"
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
