import { slide as Menu } from "react-burger-menu";
import { SidebarData } from "./SidebarData";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

function SideBar() {
  return (
    <div className="sidebar">
      <ul className="sidebarList">
        <li className="row">
          {" "}
          <div id="icon">
            <HomeOutlinedIcon
              fontSize="large"
              color="action"
              sx={{ "&:hover": { color: "#333634" } }}
            ></HomeOutlinedIcon>{" "}
          </div>
          {/* <div id="title">
            <p></p>
          </div> */}
        </li>

        <li className="row">
          {" "}
          <div id="icon">
            <NotificationsRoundedIcon fontSize="large"></NotificationsRoundedIcon>{" "}
          </div>
        </li>

        <li className="row">
          {" "}
          <div id="icon">
            <GroupsRoundedIcon fontSize="large"></GroupsRoundedIcon>{" "}
          </div>
        </li>

        <li className="row">
          {" "}
          <div id="icon">
            <SettingsRoundedIcon fontSize="large"></SettingsRoundedIcon>{" "}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
