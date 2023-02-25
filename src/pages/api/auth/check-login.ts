import ErrorHandler from "@/server/middleware/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "@/server/middleware/errorResponse";
import { User } from "@/server/database/model";
import { sendEmail } from "@/utils/sendMail";
import { withProtected } from "@/server/middleware/withProtected";

interface Data {}

async function CheckLoginHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    await ErrorHandler(GetCheckLogin, req, res);
  } else {
    res.status(404).json({ message: "Not Fund" });
  }
}

const GetCheckLogin = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, user_name, isEmailVerified, email } = req.body.req_user_data;

  res.status(200).send({
    success: true,
    message: "Authorized!!",
    response: {
      isEmailVerified,
      email,
      user_name,
    },
  });
};

export default withProtected(CheckLoginHandler);
