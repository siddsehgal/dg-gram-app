import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { APICall } from "@/utils/apiCall";
import { AuthResource } from "../_helpers/resources";
import { ShowType, SignInComponentType } from "../_helpers/types";

export default function UpdateEmailComponent({ setShow }: SignInComponentType) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email);

    setLoading(true);

    const res = await APICall({
      ...AuthResource.UpdateEmailAPI,
      enqueueSnackbar,
      body: { email },
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });

    const { success, message, response } = res;
    if (success) {
      localStorage.setItem("email", email);
      setShow(ShowType.otp);
    }

    setLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        type="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email}
        onChange={handleChange}
        autoFocus
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
        Update Email
      </Button>
      <Grid container>
        <Grid item>
          {loading && <CircularProgress />}
          <Button
            type="submit"
            fullWidth
            color="error"
            variant="text"
            onClick={() => {
              setShow(ShowType.otp);
            }}
            sx={{ mt: 1, mb: 2 }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
