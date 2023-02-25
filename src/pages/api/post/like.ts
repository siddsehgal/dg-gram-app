import ErrorHandler from "@/server/middleware/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "@/server/middleware/errorResponse";
import { Follower, Post, PostLike, User } from "@/server/database/model";
import { sendEmail } from "@/utils/sendMail";
import { withProtected } from "@/server/middleware/withProtected";
import { Op } from "sequelize";

interface Data {}

async function PostLikeHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    await ErrorHandler(CreatePostLike, req, res);
  } else if (req.method === "DELETE") {
    await ErrorHandler(DeletePostLike, req, res);
  } else {
    res.status(404).json({ message: "Not Fund" });
  }
}

const CreatePostLike = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const user = req.body.req_user_data;
  const { post_id } = req.query;

  if (!Number(post_id))
    return ErrorResponse({ message: "post_id is Required!!" }, 400, res);

  const post = await Post.findOne({ where: { id: post_id } });

  if (!post) return ErrorResponse({ message: "No post found!!" }, 404, res);

  const postLikeObj = {
    user_id: user.id,
    post_id: Number(post_id),
  };

  const postLike = await PostLike.create(postLikeObj);

  res.status(201).json({
    success: true,
    message: "Post Liked Successfully",
    response: { postLike },
  });
};

const DeletePostLike = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const user = req.body.req_user_data;
  const { post_id } = req.query;

  if (!Number(post_id))
    return ErrorResponse({ message: "post_id is Required!!" }, 400, res);

  const post = await Post.findOne({ where: { id: post_id } });

  if (!post) return ErrorResponse({ message: "No post found!!" }, 404, res);

  const postLike = await PostLike.destroy({
    where: { user_id: user.id, post_id },
  });

  res.status(201).json({
    success: true,
    message: "Post Liked Removed Successfully",
    response: { postLike },
  });
};

// const DeleteFollow = async (
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) => {
//   // const { id, user_name, isEmailVerified, email } = req.body.req_user_data;
//   const { user_id } = req.query;
//   const user = req.body.req_user_data;

//   const isAlreadyFollowed = await Follower.findOne({
//     where: {
//       user_id: user_id,
//       follower_id: user.id,
//     },
//   });

//   if (!isAlreadyFollowed)
//     return ErrorResponse({ message: "Not already Following" }, 400, res);

//   await isAlreadyFollowed.destroy();

//   res.send({
//     success: true,
//     message: "Un-Followed Successfully",
//   });
// };

export default withProtected(PostLikeHandler);
