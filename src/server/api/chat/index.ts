import ErrorHandler from "@/server/middleware/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "@/server/middleware/errorResponse";
import {
  Chat,
  Follower,
  Post,
  PostLike,
  User,
  UsersRoom,
} from "@/server/database/model";
import { sendEmail } from "@/utils/sendMail";
import { withProtected } from "@/server/middleware/withProtected";
import { Op } from "sequelize";
import { getUsersRoom } from "../socket";

interface Data {}

async function UserHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    await ErrorHandler(GetUserChat, req, res);
  } else {
    res.status(404).json({ message: "Not Fund" });
  }
}

const GetUserChat = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // const { id, user_name, isEmailVerified, email } = req.body.req_user_data;
  const user = req.body.req_user_data;

  const { user_id } = req.query;
  if (!user_id)
    return ErrorResponse({ message: "User_id Is Required" }, 404, res);
  const room = getUsersRoom([user.id, user_id]);
  let usersRoom = await UsersRoom.findOne({
    where: { users: room },
  });

  const userData = await User.findOne({
    where: { id: user_id },
    attributes: ["id", "full_name", "user_name"],
  });

  if (!usersRoom) {
    usersRoom = await UsersRoom.create({ users: room });
  }

  const chats = await Chat.findAll({ where: { room_id: usersRoom.id } });

  return res.status(200).send({
    success: true,
    message: "Chats Fetched Successfully",
    response: {
      chats,
      users_room_id: usersRoom.id,
      user_id: user.id,
      userData,
    },
  });
};

export default await withProtected(UserHandler);
