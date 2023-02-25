import ErrorHandler from "@/server/middleware/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "@/server/middleware/errorResponse";
import { Follower, User } from "@/server/database/model";
import { sendEmail } from "@/utils/sendMail";
import { withProtected } from "@/server/middleware/withProtected";
import { Op } from "sequelize";

interface Data {}

async function FollowHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    await ErrorHandler(PostFollow, req, res);
  } else if (req.method === "DELETE") {
    await ErrorHandler(DeleteFollow, req, res);
  } else {
    res.status(404).json({ message: "Not Fund" });
  }
}

const PostFollow = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { user_id } = req.query;
  const user = req.body.req_user_data;

  const checkUser = await User.findOne({ where: { id: user_id } });
  if (!checkUser)
    return ErrorResponse({ message: "user Not Found!!" }, 404, res);

  const isAlreadyFollowed = await Follower.findOne({
    where: {
      user_id,
      follower_id: user.id,
    },
  });

  if (isAlreadyFollowed)
    return ErrorResponse({ message: "Already Following" }, 400, res);

  const follow = await Follower.create({
    user_id: Number(user_id),
    follower_id: user.id,
  });

  res.status(200).json({
    success: true,
    message: "User Followed Successfully",
    response: { follow },
  });
};

const DeleteFollow = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  // const { id, user_name, isEmailVerified, email } = req.body.req_user_data;
  const { user_id } = req.query;
  const user = req.body.req_user_data;

  const isAlreadyFollowed = await Follower.findOne({
    where: {
      user_id: user_id,
      follower_id: user.id,
    },
  });

  if (!isAlreadyFollowed)
    return ErrorResponse({ message: "Not already Following" }, 400, res);

  await isAlreadyFollowed.destroy();

  res.send({
    success: true,
    message: "Un-Followed Successfully",
  });
};

export default await withProtected(FollowHandler);
