import * as React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Skeleton,
} from "@mui/material";
import { useRouter } from "next/router";
import { BoxContentCentered } from "@/styles/style";
import { APICall } from "@/utils/apiCall";
import { PostResource } from "../_helpers/resources";
import PostCardComponent from "../postCardComponent/postCardComponent";

export default function PostComponent({ post_id }: { post_id: number }) {
  const router = useRouter();
  const [post, setPost] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const getPostApiCall = async () => {
    setLoading(true);
    console.log(post_id);

    const res = await APICall({
      ...PostResource.GetPostAPI,
      enqueueSnackbar,
      query: { post_id },
    });

    const { success, message, response } = res;
    if (success) {
      console.log(response);

      setPost(response.posts.length > 0 ? [response.posts[0]] : []);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getPostApiCall();
  }, []);

  return (
    <Container maxWidth={"xs"}>
      {loading && (
        <BoxContentCentered>
          <CircularProgress />
        </BoxContentCentered>
      )}
      {post.length > 0 ? (
        <PostCardComponent
          post={post[0]}
          setPosts={setPost}
          // isPostPage={true}
        />
      ) : (
        <Box sx={{ marginTop: "8%", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignContent: "center",
            }}
          >
            <Skeleton
              variant="circular"
              // sx={{ width: "20%", height: "auto", aspectRatio: "1/1" }}
              width={50}
              height={50}
              // animation={noUser ? false : "pulse"}
            />
            <Skeleton
              variant="text"
              sx={{ width: "80%", height: "50px" }}
              // animation={noUser ? false : "pulse"}
            />
          </Box>

          <Skeleton
            // animation={noUser ? false : "pulse"}
            variant="rectangular"
            width={"100%"}
            height={150}
            sx={{ my: "8px" }}
          />
          {/* {noUser && <Typography>No User Found</Typography>} */}
          <Skeleton
            // animation={noUser ? false : "pulse"}
            variant="rounded"
            width={"100%"}
            height={60}
            sx={{ marginBottom: 1 }}
          />
        </Box>
      )}
    </Container>
  );
}
