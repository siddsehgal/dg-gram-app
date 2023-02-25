import ErrorHandler from "@/server/middleware/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "@/server/middleware/errorResponse";
import { Chat, Follower, User, UsersRoom } from "@/server/database/model";
import { sendEmail } from "@/utils/sendMail";
import { withProtected } from "@/server/middleware/withProtected";
import { Op, literal, fn, col } from "sequelize";

interface Data {}

async function SearchUserHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    await ErrorHandler(GetChatUsersList, req, res);
  } else {
    res.status(404).json({ message: "Not Fund" });
  }
}

const GetChatUsersList = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  // const { id, user_name, isEmailVerified, email } = req.body.req_user_data;
  const user = req.body.req_user_data;

  const usersRoom = await UsersRoom.findAll({
    where: {
      [Op.and]: [fn("FIND_IN_SET", user.id, col("users"))],
    },
  });

  const messages = await Chat.findAll({
    where: { room_id: { [Op.in]: usersRoom.map((item) => item.id) } },
    attributes: [
      "room_id",
      [
        "(select message from chats where room_id = Chat.room_id order by created_at desc limit 1)",
        "message",
      ],
    ],
    include: {
      model: UsersRoom,
      as: "room_data",
      attributes: ["id", "users"],
    },
    group: ["room_id"],
  });
  const userArr = messages.map((item) => {
    return item.room_data.users.split(",").filter((i) => i != user.id)[0];
  });

  const usersData = await User.findAll({
    where: { id: { [Op.in]: userArr } },
    attributes: ["id", "full_name", "user_name"],
  });

  usersData.forEach((item: any, index) => {
    item.setDataValue("message", messages[index].message);
  });

  res.status(200).send({
    success: true,
    message: "User data fetched Successfully!!",
    response: {
      // usersRoom, userArr,
      users: usersData,
      // messages,
    },
  });
};

export default await withProtected(SearchUserHandler);
