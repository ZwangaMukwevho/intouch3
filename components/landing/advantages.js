import classes from "./advantages.module.css";
import FingerprintRoundedIcon from "@mui/icons-material/FingerprintRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import AvTimerRoundedIcon from "@mui/icons-material/AvTimerRounded";

export default function Advantages() {
  return (
    <div>
      <div className={classes.heading}>
        Authenticate ID documents effectively and verify users with unparalled
        global coverge
      </div>
      <div className={classes.circlesContainer}>
        <div className={classes.circles}>
          <FingerprintRoundedIcon> </FingerprintRoundedIcon>
        </div>
        <div className={classes.circles}>
          <RateReviewRoundedIcon></RateReviewRoundedIcon>
        </div>
        <div className={classes.circles}>
          <AvTimerRoundedIcon fontSize="large"></AvTimerRoundedIcon>
        </div>
      </div>
    </div>
  );
}
