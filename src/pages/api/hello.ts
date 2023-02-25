import ErrorHandler from "@/server/middleware/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "@/server/middleware/errorResponse";
import User from "@/server/database/model/user";

interface Data {}

export default async function SignInHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(404).json({ message: User });
}

const PostSignIn = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { full_name, email, password, confirmPassword } = req.body;

  if (!full_name || !email || !password || !confirmPassword)
    return ErrorResponse({ message: "All Fields are Required!!" }, 400, res);

  if (password !== confirmPassword)
    return ErrorResponse(
      { message: "Password and Confirm Password Must be Same!!" },
      400,
      res
    );

  const hashedPassword = bcrypt.hashSync(password, 10);

  let user = await User.findOne({
    where: {
      email: email.toLowerCase(),
    },
  });

  const OTP = Math.floor(100000 + Math.random() * 900000);

  if (user)
    return ErrorResponse(
      { message: "User already exist with this email!!" },
      400,
      res
    );

  user = await User.create({
    full_name: full_name,
    email,
    password: hashedPassword,
    OTP,
    isEmailVerified: false,
  });

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET_KEY || "TheSecretKey",
    { expiresIn: process.env.JWT_EXP_TIME || "24h" }
  );

  // Send Mail
  // sendEmail({
  //   from: process.env.MY_EMAIL,
  //   to: email,
  //   subject: "Email Verification",
  //   text: `Verify your Email Using OTP: ${OTP}`,
  // });

  return res.status(201).json({
    success: true,
    message: "User Sign Up Successfully!!",
    response: { token },
  });
};
