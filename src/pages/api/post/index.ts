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

async function PostHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    await ErrorHandler(CreatePost, req, res);
  } else if (req.method === "GET") {
    await ErrorHandler(GetPosts, req, res);
  } else if (req.method === "DELETE") {
    await ErrorHandler(DeletePost, req, res);
  } else {
    res.status(404).json({ message: "Not Fund" });
  }
}

const CreatePost = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const user = req.body.req_user_data;
  const { content } = req.body;

  const postObj = {
    user_id: user.id,
    content,
  };

  const post = await Post.create(postObj);

  res.status(201).json({
    success: true,
    message: "Post Created Successfully",
    response: { post },
  });
};

const GetPosts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const user = req.body.req_user_data;
  const { post_id, user_id, following } = req.query;

  const followedUsersIds =
    following == "true"
      ? (
          await Follower.findAll({
            where: { follower_id: user.id },
            attributes: ["id", "user_id"],
          })
        ).map((item) => item.user_id)
      : [];

  const posts = await Post.findAll({
    where: {
      ...(post_id
        ? { id: post_id }
        : {
            user_id:
              following == "true"
                ? {
                    [Op.in]: [...followedUsersIds, user.id],
                  }
                : user_id || user.id,
          }),
    },
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
    order: [["createdAt", "desc"]],
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

const DeletePost = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // const { id, user_name, isEmailVerified, email } = req.body.req_user_data;
  const user = req.body.req_user_data;
  const { post_id } = req.query;

  const post = await Post.findOne({
    where: {
      id: post_id,
      user_id: user.id,
    },
  });

  if (!post) return ErrorResponse({ message: "Post not Found" }, 400, res);

  await post.destroy();

  res.send({
    success: true,
    message: "Post Deleted Successfully",
  });
};

export default await withProtected(PostHandler);
