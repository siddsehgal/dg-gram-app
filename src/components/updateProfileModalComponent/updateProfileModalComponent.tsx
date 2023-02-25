import { APICall } from "@/utils/apiCall";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { UserResource } from "../_helpers/resources";

export default function UpdateProfileModalComponent({
  handleClose,
  userData,
  setUpdateUserData,
}: any) {
  const { full_name, user_name, email, phoneNumber } = userData;
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name,
    user_name,
    email,
    phoneNumber,
  });

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const res = await APICall({
      ...UserResource.UpdateUserAPI,
      enqueueSnackbar,
      body: formData,
    });

    const { success, message, response } = res;
    if (success) {
      handleClose();
      setUpdateUserData((prev: any) => !prev);
    }

    setLoading(false);
  };
  return (
    <Box
      maxWidth={"xs"}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        maxWidth: "500px",
        bgcolor: "#fff",
        // border: "2px solid #000",
        borderRadius: 2,
        boxShadow: 20,
        p: 4,
      }}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Edit Profile
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="full_name"
          label="Full Name"
          name="full_name"
          onChange={handleChange}
          autoComplete="full_name"
          value={formData.full_name}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="user_name"
          label="User Name (Unique)"
          name="user_name"
          onChange={handleChange}
          autoComplete="user_name"
          value={formData.user_name}
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
          value={formData.email}
        />

        <TextField
          margin="normal"
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          onChange={handleChange}
          autoComplete="phoneNumber"
          value={formData.phoneNumber || ""}
        />

        {loading && <CircularProgress />}

        <Grid container>
          <Grid item mr={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="button"
              fullWidth
              color="error"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
