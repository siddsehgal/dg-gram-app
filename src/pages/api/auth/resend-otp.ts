import ErrorHandler from "@/server/middleware/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "@/server/middleware/errorResponse";
import { User } from "@/server/database/model";
import { sendEmail } from "@/utils/sendMail";
import { withProtected } from "@/server/middleware/withProtected";

interface Data {}

async function ResendOtp(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    await ErrorHandler(PostResendOtp, req, res);
  } else {
    res.status(404).json({ message: "Not Fund" });
  }
}

const PostResendOtp = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email, isEmailVerified, OTP } = req.body.req_user_data;

  // Send Mail

  if (!isEmailVerified)
    // Send Mail
    sendEmail({
      from: process.env.MY_EMAIL,
      to: email,
      subject: "Email Verification",
      text: `Verify your Email Using OTP: ${OTP}`,
    });

  res.status(200).send({
    // isEmailVerified: isEmailVerified,
    success: true,
    message: "Otp Sent Successfully!!",
  });
};

export default withProtected(ResendOtp);
