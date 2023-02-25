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

async function UserHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    await ErrorHandler(GetUser, req, res);
  } else if (req.method === "PATCH") {
    await ErrorHandler(PatchUser, req, res);
  } else {
    res.status(404).json({ message: "Not Fund" });
  }
}

const GetUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // const { id, user_name, isEmailVerified, email } = req.body.req_user_data;
  const user = req.body.req_user_data;
  const { user_id } = req.query;

  const [follower_count, following_count, post_count] = await Promise.all([
    Follower.count({
      where: {
        user_id: user_id ? user_id : user.id,
      },
    }),
    Follower.count({
      where: {
        follower_id: user_id ? user_id : user.id,
      },
    }),
    Post.count({
      where: { user_id: user_id ? user_id : user.id, status: 1 },
    }),
  ]);
  let responseObj = {
    success: true,
    message: "User Fetched Successfully!!",
    response: {
      follower_count,
      following_count,
      post_count,
      user,
      selfProfile: true,
      isFollowing: false,
    },
  };

  if (!user_id || user_id == user.id) {
    await user.reload({ attributes: ["phoneNumber"] });
    responseObj.response = {
      ...responseObj.response,
      user,
      selfProfile: true,
      isFollowing: false,
    };
    return res.status(200).send(responseObj);
  }
  const userData = await User.findOne({ where: { id: user_id } });
  if (!userData)
    return ErrorResponse(
      { message: "User not found", errorCode: "NO_USER_FOUND" },
      404,
      res
    );

  const followingCheck = await Follower.findOne({
    where: { user_id: userData.id, follower_id: user.id },
  });

  responseObj.response = {
    ...responseObj.response,
    user: userData,
    selfProfile: false,
    isFollowing: Boolean(followingCheck),
  };
  return res.status(200).send(responseObj);
};

const PatchUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // const { id, user_name, isEmailVerified, email } = req.body.req_user_data;
  const user = req.body.req_user_data;

  const { full_name, user_name, phoneNumber } = req.body;
  let email = req.body.email ? req.body.email.toLowerCase() : req.body.email;

  const updateObj: any = {};
  if (email && email != user.email) {
    updateObj["email"] = email;
    updateObj["isEmailVerified"] = false;
  }
  if (full_name && full_name != user.full_name) {
    updateObj["full_name"] = full_name;
  }
  if (phoneNumber && phoneNumber != user.phoneNumber) {
    if (phoneNumber.length != 10)
      return ErrorResponse(
        { message: "Please Enter a Valid Phone Number!!" },
        400,
        res
      );
    updateObj["phoneNumber"] = phoneNumber;
  }
  if (user_name && user_name != user.user_name) {
    const checkUserName = await User.findOne({
      where: {
        user_name: user_name,
        id: { [Op.ne]: user.id },
      },
      attributes: ["id"],
    });

    if (checkUserName)
      return ErrorResponse(
        { message: "This UserName is already taken. Try different UserName." },
        400,
        res
      );
    updateObj["user_name"] = user_name;
  }

  await user.update(updateObj);
  await user.reload();
  res.status(200).send({
    success: true,
    message: "User Updated Successfully!!",
    response: {
      user,
    },
  });
};

export default await withProtected(UserHandler);
