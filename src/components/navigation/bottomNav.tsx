import * as React from "react";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AccountCircle } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { MiniDrawerType } from "./types/navTypes";
import HomeIcon from "@mui/icons-material/Home";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MessageIcon from "@mui/icons-material/Message";
import { BottomNavEnum, changeBottomNav } from "redux/features/bottomNav";

export default function BottomNav({ children }: MiniDrawerType) {
  const isLogin = useSelector((state: RootState) => state.isLogin.value);
  const bottomNav = useSelector((state: RootState) => state.bottomNav.value);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: BottomNavEnum
  ) => {
    dispatch(changeBottomNav(newValue));
  };
  const styleObj = {
    paddingX: "0",
    minWidth: "60px",
  };
  return (
    <>
      {bottomNav == BottomNavEnum.Hidden || (
        <Container maxWidth="xs">
          {isLogin ? (
            <Paper
              sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
              elevation={3}
            >
              <BottomNavigation
                showLabels
                value={bottomNav}
                onChange={handleChange}
              >
                <BottomNavigationAction
                  sx={styleObj}
                  label={BottomNavEnum.Home}
                  value={BottomNavEnum.Home}
                  icon={<HomeIcon />}
                  onClick={() => {
                    router.push("/");
                  }}
                />
                <BottomNavigationAction
                  sx={styleObj}
                  label={BottomNavEnum.Search}
                  value={BottomNavEnum.Search}
                  icon={<SearchIcon />}
                  onClick={() => {
                    router.push("/search");
                  }}
                />
                <BottomNavigationAction
                  sx={styleObj}
                  label={BottomNavEnum.Create}
                  value={BottomNavEnum.Create}
                  icon={<AddBoxIcon />}
                  onClick={() => {
                    router.push("/create");
                  }}
                />

                <BottomNavigationAction
                  sx={styleObj}
                  label={BottomNavEnum.Chat}
                  value={BottomNavEnum.Chat}
                  icon={<MessageIcon />}
                  onClick={() => {
                    router.push("/chat");
                  }}
                />

                <BottomNavigationAction
                  sx={styleObj}
                  label={BottomNavEnum.Profile}
                  value={BottomNavEnum.Profile}
                  icon={<AccountCircle />}
                  onClick={() => {
                    router.push("/profile");
                  }}
                />
                {/* <BottomNavigationAction
              sx={styleObj}
              label={BottomNavEnum.Home}
              value={BottomNavEnum.Home}
              icon={<LogoutIcon />}
              onClick={() => {
                localStorage.clear();
                dispatch(changeLoginStatus(false));
              }}
            /> */}
              </BottomNavigation>
            </Paper>
          ) : (
            <Box />
          )}
        </Container>
      )}
    </>
  );
}
