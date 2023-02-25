import { APICall } from "@/utils/apiCall";
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
import { ShowType, SignUpComponentType } from "../_helpers/types";
import { AuthResource } from "../_helpers/resources";

export default function SignUpComponent({ setShow }: SignUpComponentType) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { full_name, email, password, confirmPassword } = formData;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    const res = await APICall({
      ...AuthResource.SignUpAPI,
      enqueueSnackbar,
      body: formData,
    });

    const { success, message, response } = res;
    if (success) {
      enqueueSnackbar(message, { variant: "success" });
      localStorage.setItem("jwt", response.token);
      localStorage.setItem("isEmailVerified", "false");
      localStorage.setItem("email", email);
      setShow(ShowType.otp);
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
          id="full_name"
          label="Full Name"
          name="full_name"
          onChange={handleChange}
          autoComplete="name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          onChange={handleChange}
          autoComplete="email"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={handleChange}
          autoComplete="current-password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          onChange={handleChange}
          autoComplete="confirm-password"
        />
        {loading && <CircularProgress />}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item>
            <Link
              variant="body2"
              onClick={() => {
                setShow(ShowType.signIn);
              }}
            >
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
