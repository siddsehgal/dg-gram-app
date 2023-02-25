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

async function SearchUserHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    await ErrorHandler(GetUserByUserName, req, res);
  } else {
    res.status(404).json({ message: "Not Fund" });
  }
}

const GetUserByUserName = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  // const { id, user_name, isEmailVerified, email } = req.body.req_user_data;
  const user = req.body.req_user_data;
  const { user_name } = req.query;

  if (!user_name)
    res.status(200).send({
      success: true,
      message: "User data fetched Successfully!!",
      response: { users: [] },
    });
  const users = await User.findAll({
    where: {
      user_name: { [Op.like]: `%${user_name}%` },
      id: { [Op.ne]: user.id },
    },
    attributes: ["id", "full_name", "user_name"],
  });

  res.status(200).send({
    success: true,
    message: "User data fetched Successfully!!",
    response: { users },
  });
};

export default await withProtected(SearchUserHandler);
