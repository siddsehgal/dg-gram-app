import { Box, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SettingIcon from "@mui/icons-material/Settings";
import UpdateProfileModalComponent from "../updateProfileModalComponent/updateProfileModalComponent";
import { useDispatch } from "react-redux";
import { changeLoginStatus } from "redux/features/isLogin";

export default function UpdateProfileIconComponent({
  userData,
  setUpdateUserData,
}: any) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const MenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    localStorage.clear();
    dispatch(changeLoginStatus(false));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "70px",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          sx={{
            width: "40px",
            height: "40px",
          }}
          onClick={handleClick}
        >
          <SettingIcon />
        </IconButton>
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

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={MenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

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
