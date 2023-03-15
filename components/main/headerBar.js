import classes from "./headerBar.module.css";
import Image from "next/image";

function HeaderBar() {
  return (
    <nav>
      <div className={classes.divHeader}>
        <div>
          <Image
            src="/logo.PNG"
            alt="Intouch Logo"
            layout="fixed"
            width={120}
            height={40}
          />
        </div>
        {/* <div>
          <input
            className={classes.inputBox}
            type={"text"}
            placeholder={"🔍Search for your document here"}
          />
        </div> */}
        <div className={classes.iconsRow}>
          <div className={classes.marginRight}>
            <Image
              className={classes.image}
              src="/profile.png"
              alt="profile Logo"
              layout="fixed"
              width={45}
              height={45}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HeaderBar;
