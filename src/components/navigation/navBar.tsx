import { AccountCircle } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

export default function NavBar() {
  const router = useRouter();

  const isLogin = useSelector((state: RootState) => state.isLogin.value);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{ cursor: "pointer" }}
              variant="h6"
              noWrap
              component="div"
              onClick={() => {
                router.push("/");
              }}
            >
              Dg Gram
            </Typography>
            {/* {isLogin && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() => {
                    router.push("/profile");
                  }}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            )} */}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
