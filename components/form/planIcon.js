import classes from "./planIcon.module.css";
import IconButton from "@mui/material/IconButton";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/router";
import Link from "next/link";

export default function PlanChoiceIcon() {
  const router = useRouter();

  const popPlansPage = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.open("/pricing", "_blank");
    }
  };

  return (
    <div className={classes.container}>
      <div>See plan details</div>
      <div className={classes.iconContainer}>
        <IconButton
          color="info"
          sx={{ "&:hover": { color: "#ff0000", fontSize: "22px" } }}
          onClick={popPlansPage}
          role="button"
          disableRipple={true}
          /* eslint-disable */
          children={
            <InfoIcon
              fontSize="medium"
              color="disabled"
              sx={{ "&:hover": { color: "#02079c", fontSize: "22px" } }}
            ></InfoIcon>
          }
          /* eslint-enable */
        ></IconButton>
      </div>
    </div>
  );
}
