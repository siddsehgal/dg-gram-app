import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SignInComponent from "../signInComponent/signInComponent";
import SignUpComponent from "../signUpComponent/signUpComponent";
import OtpVerifyComponent from "../otpVerifyComponent/otpVerifyComponent";
import UpdateEmailComponent from "../updateEmailComponent/updateEmailComponent";
import UpdateUserNameComponent from "../updateUserNameComponent/updateUserNameComponent";
import { ShowType } from "../_helpers/types";

export default function AuthComponent() {
  const [show, setShow] = React.useState(ShowType.signIn);
  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      if (localStorage.getItem("isEmailVerified") === "false")
        setShow(ShowType.otp);
      else if (localStorage.getItem("isUserName") === "false")
        setShow(ShowType.updateUserName);
    }
  }, []);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {show == ShowType.signIn && "Sign In"}
            {show == ShowType.signUp && "Sign Up"}
            {show == ShowType.otp && "Email Verify"}
          </Typography>
        </Box>
        {show == ShowType.signIn && <SignInComponent setShow={setShow} />}
        {show == ShowType.signUp && <SignUpComponent setShow={setShow} />}
        {show == ShowType.otp && <OtpVerifyComponent setShow={setShow} />}
        {show == ShowType.updateEmail && (
          <UpdateEmailComponent setShow={setShow} />
        )}
        {show == ShowType.updateUserName && (
          <UpdateUserNameComponent setShow={setShow} />
        )}
      </Container>
    </>
  );
}
