import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PostTopSectionComponentType } from "../_helpers/types";
import { APICall } from "@/utils/apiCall";
import { PostResource } from "../_helpers/resources";

export default function PostTopSectionComponent({
  post,
  setPosts,
}: PostTopSectionComponentType) {
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();
  useEffect(() => {}, []);

  const handleDeletePostClick = async (
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    handleClose();
    const res = await APICall({
      ...PostResource.DeletePostAPI,
      enqueueSnackbar,
      query: { post_id: post.id },
    });
    const { success, message, response } = res;
    if (!success) {
    } else {
      setPosts((prev) => {
        return prev.filter((item) => item.id != post.id);
      });
    }
  };

  const handleProfileClick = () => {
    router.push(`/profile/${post.user_id}`);
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Box
            onClick={handleProfileClick}
            sx={{
              position: "relative",
              width: "30%",
              maxWidth: "40px",
              aspectRatio: "1/1",
              overflow: "hidden",
            }}
          >
            <Image
              fill
              style={{
                borderRadius: "50%",
              }}
              src={"/images/profile-img.jpeg"}
              alt="profile-image"
            ></Image>
          </Box>
          <Box
            onClick={handleProfileClick}
            sx={{
              width: "70%",
              marginLeft: "4%",
            }}
          >
            <Typography variant="h6" color={"HighlightText"}>
              {post.user_data.user_name}
            </Typography>
          </Box>
        </Box>
        {post.is_self_post && (
          <Box>
            <IconButton
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleDeletePostClick}>Delete</MenuItem>
      </Menu>
    </>
  );
}
