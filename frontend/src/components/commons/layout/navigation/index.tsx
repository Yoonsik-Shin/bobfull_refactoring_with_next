import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, { useEffect, useState } from "react";
import { NextLinkComposed } from "../../routers/Link";
import { isLoginState } from "@/commons/store";
import { useRecoilValue } from "recoil";

export default function LayoutSider() {
  const [value, setValue] = React.useState("recents");
  const isLogin = useRecoilValue(isLoginState);
  const [isLogined, setIsLogined] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    setIsLogined(isLogin);
  });

  return (
    <BottomNavigation
      sx={{ position: "sticky", bottom: 0, left: 0 }}
      value={value}
      onChange={handleChange}
    >
      {isLogined ? (
        <BottomNavigationAction
          component={NextLinkComposed}
          to={{ pathname: "/profile" }}
          label="Profile"
          value="Profile"
          icon={<RestoreIcon />}
        />
      ) : (
        <BottomNavigationAction
          component={NextLinkComposed}
          to={{ pathname: "/login" }}
          label="Login"
          value="Login"
          icon={<RestoreIcon />}
        />
      )}
      <BottomNavigationAction
        component={NextLinkComposed}
        to={{ pathname: "/signup" }}
        label="Signup"
        value="Signup"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        component={NextLinkComposed}
        to={{ pathname: "/" }}
        label="None"
        value="None"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        component={NextLinkComposed}
        to={{ pathname: "/" }}
        label="home"
        value="home"
        icon={<FolderIcon />}
      />
    </BottomNavigation>
  );
}
