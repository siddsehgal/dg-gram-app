import { BoxContentCentered } from "@/styles/style";
import { APICall } from "@/utils/apiCall";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import PostCardComponent from "../postCardComponent/postCardComponent";
import { PostResource } from "../_helpers/resources";
import { ProfilePagePostListComponentType } from "../_helpers/types";

export default function ProfilePagePostListComponent({
  user_id,
  following,
}: ProfilePagePostListComponentType) {
  const { enqueueSnackbar } = useSnackbar();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPostApiCall();
  }, []);

  const getPostApiCall = async () => {
    setIsLoading(true);
    const res = await APICall({
      ...PostResource.GetPostAPI,
      enqueueSnackbar,
      query: {
        ...(user_id ? { user_id } : {}),
        following: Boolean(following),
      },
    });

    const { success, message, response }: any = res;
    if (success) {
      setPosts(response.posts);
    }
    setIsLoading(false);
  };
  return (
    <>
      <BoxContentCentered>
        {isLoading && <CircularProgress />}
      </BoxContentCentered>
      {posts.map((post) => (
        <PostCardComponent
          key={`post_card_${post.id}`}
          post={post}
          setPosts={setPosts}
        />
      ))}
    </>
  );
}
