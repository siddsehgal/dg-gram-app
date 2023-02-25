import ErrorHandler from "@/server/middleware/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "@/server/middleware/errorResponse";
import { User } from "@/server/database/model";
import { sendEmail } from "@/utils/sendMail";
import { withProtected } from "@/server/middleware/withProtected";
import { Op } from "sequelize";

interface Data {}

async function UpdateUserNameHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PATCH") {
    await ErrorHandler(PatchUserName, req, res);
  } else {
    res.status(404).json({ message: "Not Fund" });
  }
}

const PatchUserName = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id: req_user_id } = req.body.req_user_data;
  const { userName } = req.body;

  if (!userName)
    return ErrorResponse({ message: "UserName is Required" }, 400, res);

  const checkUserName = await User.findOne({
    where: {
      user_name: userName,
      id: { [Op.ne]: req_user_id },
    },
    attributes: ["id"],
  });

  if (checkUserName)
    return ErrorResponse(
      { message: "This UserName is already taken. Try different UserName." },
      400,
      res
    );

  await User.update({ user_name: userName }, { where: { id: req_user_id } });

  res.status(200).send({
    success: true,
    message: "User Name Updated Successfully",
  });
};

export default withProtected(UpdateUserNameHandler);
