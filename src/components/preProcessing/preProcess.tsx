import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { APICall } from "@/utils/apiCall";
import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import { changeLoginStatus } from "redux/features/isLogin";
import NavBar from "../navigation/navBar";
import { useRouter } from "next/router";
import { AuthResource } from "../_helpers/resources";

export default function PreProcess({ Component, pageProps }: any) {
  const [isLoading, setIsLoading] = useState(true);
  // const [isLogin, setIsLogin] = useState(true);
  const isLogin = useSelector((state: RootState) => state.isLogin.value);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log("Is Login Use Effect");

    if (!isLogin && !isLoading) router.push("/");
  }, [isLogin]);

  useEffect(() => {
    let token = localStorage.getItem("jwt");
    console.log("Token: ", token);

    if (!token) {
      dispatch(changeLoginStatus(false));
      setIsLoading(false);
      router.push("/");
    } else {
      const apiCall = async () => {
        const res = await APICall({
          ...AuthResource.CheckLoginAPI,
          enqueueSnackbar,
          headers: { Authorization: `Bearer ${token}` },
        });
        // const res = await APICall(
        //   "",
        //   "/api/auth/check-login",
        //   "GET",
        //   {},
        //   { Authorization: `Bearer ${token}` }
        // );

        const { success, message, response } = res;
        if (!success) {
          // enqueueSnackbar(message, { variant: "error" });
          dispatch(changeLoginStatus(false));
        } else {
          // enqueueSnackbar(message, { variant: "success" });
          localStorage.setItem(
            "isEmailVerified",
            response.isEmailVerified ? "true" : "false"
          );
          localStorage.setItem(
            "isUserName",
            response.user_name ? "true" : "false"
          );
          localStorage.setItem("email", response.email);
          if (response.isEmailVerified && response.user_name)
            dispatch(changeLoginStatus(true));
          else dispatch(changeLoginStatus(false));
        }
        setIsLoading(false);
      };

      apiCall();
    }
  }, []);
  pageProps = { ...pageProps };
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Skeleton variant="rectangular" width={"70%"} height={120} />
          <Skeleton width={"70%"} height={50} />
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              width: "70%",
            }}
          >
            <Skeleton width={"60%"} height={40} />
          </Box>
        </Box>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
