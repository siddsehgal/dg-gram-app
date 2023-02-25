import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSnackbar } from "notistack";

import { Button, CircularProgress } from "@mui/material";
import { BoxContentCentered } from "@/styles/style";
import { APICall } from "@/utils/apiCall";
import { PostResource } from "../_helpers/resources";
import { useDispatch } from "react-redux";
import { BottomNavEnum, changeBottomNav } from "redux/features/bottomNav";

export default function CreateComponent() {
  const [postContent, setPostContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(changeBottomNav(BottomNavEnum.Create));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setPostContent(value);
  };

  const handleClick = () => {
    createPostApiCall();
  };

  const createPostApiCall = async () => {
    setLoading(true);
    const res = await APICall({
      ...PostResource.CreatePostAPI,
      enqueueSnackbar,
      body: { content: postContent },
    });

    const { success, message, response } = res;
    if (success) {
      setPostContent("");
    }
    setLoading(false);
  };

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ py: 2 }}>
        <Typography width={"100%"} textAlign="center" variant="h5">
          Create Post
        </Typography>

        <Box sx={{ width: "100%", py: "2%" }}>
          <textarea
            style={{
              width: "96%",
              minWidth: "96%",
              maxWidth: "96%",
              minHeight: "150px",
              padding: "2%",
            }}
            rows={5}
            cols={10}
            placeholder="Enter your Content Here!!"
            onChange={handleChange}
            value={postContent}
          ></textarea>

          {loading && (
            <BoxContentCentered>
              <CircularProgress />
            </BoxContentCentered>
          )}

          <Button variant="contained" onClick={handleClick}>
            Post
          </Button>
        </Box>
      </Container>
    </>
  );
}
