import ErrorHandler from "@/server/middleware/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "@/server/middleware/errorResponse";
import { User } from "@/server/database/model";
import { sendEmail } from "@/utils/sendMail";

interface Data {}

export default async function SignInHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    await ErrorHandler(PostSignIn, req, res);
  } else {
    res.status(404).json({ message: "Not Found" });
  }
}

const PostSignIn = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email: email },
  });

  if (!user)
    return ErrorResponse(
      { message: "No User Exist with given Email Address!!" },
      400,
      res
    );

  if (!bcrypt.compareSync(password, user.password))
    return ErrorResponse({ message: "Incorrect Password!!" }, 400, res);

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET_KEY || "TheSecretKey",
    { expiresIn: process.env.JWT_EXP_TIME || "24h" }
  );

  res.status(200).json({
    success: true,
    message: "Login Successfully!!",
    response: {
      token,
      isEmailVerified: user.isEmailVerified,
      user_name: user.user_name,
    },
  });
};
