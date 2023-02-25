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

async function UpdateEmailHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PATCH") {
    await ErrorHandler(PostUpdateEmail, req, res);
  } else {
    res.status(404).json({ message: "Not Fund" });
  }
}

const PostUpdateEmail = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body.req_user_data;
  const { email } = req.body;

  if (!email)
    return ErrorResponse({ message: "Email is Required!!" }, 400, res);

  const checkEmail = await User.findOne({
    where: { email, id: { [Op.ne]: id } },
  });

  if (checkEmail) {
    return ErrorResponse(
      { message: "Email Address already in Use!!" },
      400,
      res
    );
  }

  await User.update({ email }, { where: { id } });

  res.status(200).send({
    success: true,
    message: "Email Successfully Updated!!",
  });
};

export default withProtected(UpdateEmailHandler);
