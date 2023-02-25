import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

import { useSnackbar } from "notistack";
import { APICall } from "@/utils/apiCall";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { changeLoginStatus } from "redux/features/isLogin";
import { AuthResource } from "../_helpers/resources";
import { SignInComponentType } from "../_helpers/types";

export default function UpdateUserNameComponent({
  setShow,
}: SignInComponentType) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const [user_name, setUserName] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(user_name);

    setLoading(true);

    const res = await APICall({
      ...AuthResource.UpdateUserNameAPI,
      enqueueSnackbar,
      body: { userName: user_name },
    });

    const { success, message, response } = res;
    if (success) {
      localStorage.setItem("isUserName", "true");
      dispatch(changeLoginStatus(true));
    }

    setLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserName(value);
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="user_name"
        type="text"
        label="User Name"
        name="user_name"
        autoComplete="user_name"
        value={user_name}
        onChange={handleChange}
        helperText="Set Your User Name (Unique)"
        autoFocus
      />
      {loading && <CircularProgress />}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
        Update User Name
      </Button>
    </Box>
  );
}
