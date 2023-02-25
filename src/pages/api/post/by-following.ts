import ErrorHandler from "@/server/middleware/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "@/server/middleware/errorResponse";
import { Follower, Post, PostLike, User } from "@/server/database/model";
import { sendEmail } from "@/utils/sendMail";
import { withProtected } from "@/server/middleware/withProtected";
import { Op } from "sequelize";
import post from "@/server/database/model/post";
import { PostLikeModelType } from "@/server/database/model/postLike";

interface Data {}

async function PostByFollowingHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    await ErrorHandler(GetPosts, req, res);
  } else {
    res.status(404).json({ message: "Not Fund" });
  }
}

const GetPosts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const user = req.body.req_user_data;
  const { user_id } = req.query;

  const posts = await Post.findAll({
    where: { user_id: user_id || user.id },
    include: [
      {
        model: PostLike,
        as: "post_likes",
        // where: { user_id: user.id },
        required: false,
        attributes: ["id", "user_id"],
      },
      {
        model: User,
        as: "user_data",
        attributes: ["id", "user_name"],
      },
    ],
  });

  // const post_like_count = await PostLike.count({ where: { post_id: post.id } });

  const postRes = posts.map((item) => {
    return {
      ...item.toJSON(),
      is_liked:
        item.post_likes.filter(
          (postLikeItem) => postLikeItem.user_id === user.id
        ).length > 0,
      is_self_post: item.user_id === user.id,
    };
  });
  res.status(201).json({
    success: true,
    message: "Post Fetched Successfully",
    response: { posts: postRes },
  });
};

export default await withProtected(PostByFollowingHandler);
