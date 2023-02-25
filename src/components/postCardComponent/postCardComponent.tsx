import { Box, Card, Typography } from "@mui/material";
import { useRouter } from "next/router";
import PostLikeSectionComponent from "../postLikeSectionComponent/postLikeSectionComponent";
import PostTopSectionComponent from "../postTopSectionComponent/postTopSectionComponent";
import { PostCardComponentType } from "../_helpers/types";

export default function PostCardComponent({
  post,
  setPosts,
}: PostCardComponentType) {
  const router = useRouter();
  console.log(post);

  return (
    <>
      <Box sx={{ marginTop: "2%", p: "1%", width: "98%" }}>
        <PostTopSectionComponent setPosts={setPosts} post={post} />
        <Card
          sx={{ marginY: "2%", paddingY: "3%", paddingX: "2%", width: "96%" }}
        >
          <Box
            onClick={() => {
              router.push(`/post/${post.id}`);
            }}
          >
            <Typography width={"96%"} textAlign={"justify"} component={"pre"}>
              {post.content}
            </Typography>
          </Box>
        </Card>
        <PostLikeSectionComponent
          post={{
            id: post.id,
            is_liked: Boolean(post.is_liked),
            post_likes: post.post_likes.length,
            createdAt: post.createdAt,
          }}
        />
      </Box>
    </>
  );
}
