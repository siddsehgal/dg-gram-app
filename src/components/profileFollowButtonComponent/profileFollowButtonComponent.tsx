import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";
import { APICall } from "@/utils/apiCall";
import { BoxContentCentered } from "@/styles/style";
import { UserResource } from "../_helpers/resources";
import { ProfileFollowButtonComponentType } from "../_helpers/types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/router";

export default function ProfileFollowButtonComponent({
  user_id,
  isFollowing,
  setUpdateUserData,
}: ProfileFollowButtonComponentType) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [following, setFollowing] = useState(isFollowing);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFollowClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setBtnDisabled(true);
    const res = await APICall({
      ...UserResource.FollowUserAPI,
      enqueueSnackbar,
      query: { user_id },
    });

    const { success, message, response } = res;
    if (success) {
      setFollowing(true);
      setUpdateUserData((prev: any) => !prev);
    }
    setBtnDisabled(false);
  };

  const handleUnFollowClick = async (
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    handleClose();
    setBtnDisabled(true);
    const res = await APICall({
      ...UserResource.UnfollowUserAPI,
      enqueueSnackbar,
      query: { user_id },
    });
    const { success, message, response } = res;
    if (success) {
      setFollowing(false);
      setUpdateUserData((prev: any) => !prev);
    }
    setBtnDisabled(false);
  };
  return (
    <>
      {!following ? (
        <Button
          disabled={btnDisabled}
          variant="contained"
          size="small"
          onClick={handleFollowClick}
        >
          Follow
        </Button>
      ) : (
        <BoxContentCentered>
          <Button
            disabled={btnDisabled}
            variant="text"
            size="small"
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleClick}
          >
            Following
          </Button>
          <Button
            disabled={btnDisabled}
            variant="contained"
            size="small"
            onClick={() => {
              router.push(`/chat/user/${user_id}`);
            }}
          >
            Message
          </Button>
        </BoxContentCentered>
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={(e) => handleUnFollowClick(e)}>UnFollow</MenuItem>
      </Menu>
    </>
  );
}
