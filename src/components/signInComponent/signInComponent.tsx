import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { APICall } from "@/utils/apiCall";
import { useDispatch } from "react-redux";
import { changeLoginStatus } from "redux/features/isLogin";
import { ShowType, SignInComponentType } from "@/components/_helpers/types";
import { AuthResource } from "../_helpers/resources";

export default function SignInComponent({ setShow }: SignInComponentType) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    const res = await APICall({
      ...AuthResource.SignInAPI,
      enqueueSnackbar,
      body: formData,
    });

    const { success, message, response } = res;
    if (success) {
      const { user_name, isEmailVerified, token } = response;
      localStorage.setItem("jwt", token);
      localStorage.setItem(
        "isEmailVerified",
        isEmailVerified ? "true" : "false"
      );
      localStorage.setItem("isUserName", user_name ? "true" : "false");
      localStorage.setItem("email", email.toLowerCase());

      if (!isEmailVerified) setShow(ShowType.otp);
      else if (!user_name) setShow(ShowType.updateUserName);
      else dispatch(changeLoginStatus(true));
    }
    setLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          onChange={handleChange}
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
          autoComplete="current-password"
        />

        {loading && <CircularProgress />}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              variant="body2"
              onClick={() => {
                setShow(ShowType.signUp);
              }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
