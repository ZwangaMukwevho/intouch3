import LandingPageHeader from "../../components/landing/landingHeader";
import Advantages from "../../components/landing/advantages";
import Image from "next/image";
import classes from "./landing.module.css";

export default function landingPage() {
  return (
    <div>
      <LandingPageHeader />
      <div className={classes.wallpaper}>
        <Image
          src="/landingWallpaper.PNG"
          alt="Intouch"
          layout="responsive"
          width={150}
          height={55}
          quantity={100}
        />
      </div>
      <Advantages />
    </div>
  );
}
