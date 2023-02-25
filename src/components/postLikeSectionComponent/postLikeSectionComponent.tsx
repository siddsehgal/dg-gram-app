import { APICall } from "@/utils/apiCall";
import {
  Box,
  Card,
  Container,
  createTheme,
  IconButton,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentIcon from "@mui/icons-material/Comment";
import { PostLikeSectionComponentType } from "../_helpers/types";
import { PostResource } from "../_helpers/resources";
const theme = createTheme({
  // palette: { mode: "dark" },
});

export default function PostLikeSectionComponent({
  post,
}: PostLikeSectionComponentType) {
  const [data, setData] = useState(post);
  const { id, is_liked, post_likes, createdAt } = data;
  const { enqueueSnackbar } = useSnackbar();

  const handleLikeClick = () => {
    console.log(data);

    if (is_liked) {
      // Call Remove Like API
      setData((prev: any) => ({
        ...prev,
        is_liked: !prev.is_liked,
        post_likes: prev.post_likes - 1,
      }));
      APICall({
        ...PostResource.RemovePostLikeAPI,
        enqueueSnackbar,
        query: { post_id: id },
      });
      // PostLikeService.removePostLikeService(
      //   { query: { post_id: id } },
      //   enqueueSnackbar
      // );
    } else {
      // Call Add Like API
      setData((prev: any) => ({
        ...prev,
        is_liked: !prev.is_liked,
        post_likes: prev.post_likes + 1,
      }));

      APICall({
        ...PostResource.LikePostAPI,
        enqueueSnackbar,
        query: { post_id: id },
      });
      // PostLikeService.createPostLikeService(
      //   { query: { post_id: id } },
      //   enqueueSnackbar
      // );
    }
  };
  return (
    <>
      <Box>
        <IconButton onClick={handleLikeClick}>
          {is_liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
        </IconButton>

        <IconButton>
          <CommentIcon />
        </IconButton>
      </Box>
      <Box sx={{ marginLeft: "1.5%" }}>
        {" "}
        <Typography>{`${post_likes} Likes`}</Typography>
        <Typography
          variant="subtitle2"
          color={"GrayText"}
        >{`${createdAt}`}</Typography>
      </Box>
    </>
  );
}
