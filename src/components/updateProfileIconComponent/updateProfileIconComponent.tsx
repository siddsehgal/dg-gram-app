import { Box, IconButton, Modal } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import UpdateProfileModalComponent from "../updateProfileModalComponent/updateProfileModalComponent";

export default function UpdateProfileIconComponent({
  userData,
  setUpdateUserData,
}: any) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "70px",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          sx={{
            width: "40px",
            height: "40px",
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <EditIcon />
        </IconButton>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <div>
          <UpdateProfileModalComponent
            handleClose={handleClose}
            userData={userData}
            setUpdateUserData={setUpdateUserData}
          />
        </div>
      </Modal>
    </>
  );
}
