import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeRoundedIcon></HomeRoundedIcon>,
    link: "/home",
  },
  {
    title: "Notifications",
    icon: <NotificationsRoundedIcon />,
    link: "/notifications",
  },
  {
    title: "Groups",
    icon: <GroupsRoundedIcon />,
    link: "/groups",
  },
  {
    title: "Settings",
    icon: <SettingsRoundedIcon />,
    link: "/settings",
  },
];
