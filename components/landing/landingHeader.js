import classes from "./landingHeader.module.css";
import Image from "next/image";

export default function LandingPageHeader() {
  return (
    <nav>
      <div className={classes.divHeader}>
        <div>
          <Image
            src="/intouchLogo.png"
            alt="Intouch Logo"
            layout="fixed"
            width={220}
            height={120}
          />
        </div>
        <div className={classes.iconsRow}>
          <div className={classes.marginRight}>
            <div className={classes.titleAlignment}>
              <div className={classes.Logintitle}>Login</div>
              <div className={classes.title}>Sign Up</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
