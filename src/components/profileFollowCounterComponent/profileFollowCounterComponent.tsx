import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ProfileFollowCounterComponentType } from "../_helpers/types";

export default function ProfileFollowCounterComponent({
  counts,
}: ProfileFollowCounterComponentType) {
  const { follower_count, following_count, post_count } = counts;

  useEffect(() => {}, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: "auto",
        borderTop: "2px solid grey",
        borderBottom: "2px solid grey",
        margin: "5px 0",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: "75px",
        }}
      >
        <Typography component={"h3"} fontSize="1.2rem">
          {follower_count}
        </Typography>
        <Typography>Followers</Typography>
      </Box>

      <Box
        sx={{
          width: "75px",
        }}
      >
        <Typography component={"h3"} fontSize="1.2rem">
          {post_count}
        </Typography>
        <Typography>Posts</Typography>
      </Box>

      <Box
        sx={{
          width: "75px",
        }}
      >
        <Typography component={"h3"} fontSize="1.2rem">
          {following_count}
        </Typography>
        <Typography>Followings</Typography>
      </Box>
    </Box>
  );
}
