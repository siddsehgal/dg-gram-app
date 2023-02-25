import { APICall } from "@/utils/apiCall";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { AuthResource } from "../_helpers/resources";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useDispatch } from "react-redux";
import { changeLoginStatus } from "redux/features/isLogin";
import { ShowType, SignInComponentType } from "../_helpers/types";

export default function OtpVerifyComponent({ setShow }: SignInComponentType) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(10);

  // const { full_name, email, password, confirmPassword } = formData;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Resend OTP");
    setLoading(true);
    const res = await APICall({
      ...AuthResource.VerifyOtpAPI,
      enqueueSnackbar,
      body: { otpEntered: otp },
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });

    const { success, message, response } = res;
    if (!success) {
      startTimer();
    } else {
      localStorage.setItem(
        "isUserName",
        response.user.user_name ? "true" : "false"
      );
      if (!response.user.user_name) setShow(ShowType.updateUserName);
      else dispatch(changeLoginStatus(true));
    }

    setLoading(false);
  };

  const startTimer = () => {
    setTimer(5);
    const interval = setInterval(() => {
      setTimer((prev) => {
        let tempTimer = prev - 1;

        if (tempTimer <= 0) {
          clearInterval(interval);
        }
        return tempTimer;
      });
    }, 1000);
    return interval;
  };

  useEffect(() => {
    const interval = startTimer();
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleChange = (event: string) => {
    setOtp(event);
  };

  const handleResendClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log("Resend OTP");
    setLoading(true);
    await APICall({
      ...AuthResource.ResendOtpAPI,
      enqueueSnackbar,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });

    setLoading(false);
    startTimer();
  };
  return (
    <>
      <Typography component="p">
        A One Time Password has been sent to your Email Address
        {
          <span style={{ color: "blue" }}>{` '${localStorage.getItem(
            "email"
          )}'`}</span>
        }
        {`. If it is incorrect, `}
        {
          <Link
            variant="body2"
            onClick={() => {
              setShow(ShowType.updateEmail);
            }}
          >
            Edit
          </Link>
        }{" "}
        {` here!`}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <MuiOtpInput
          TextFieldsProps={{ type: "number" }}
          length={6}
          value={otp}
          onChange={handleChange}
        />

        {loading && <CircularProgress />}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Verify
        </Button>
        <Grid container>
          <Grid item>
            {timer > 0 && (
              <Typography variant="body2">{`Resend OTP in ${timer}`}</Typography>
            )}
            {timer <= 0 && (
              <Button
                color="secondary"
                variant="text"
                onClick={(e) => {
                  handleResendClick(e);
                }}
              >
                Resend OTP
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
