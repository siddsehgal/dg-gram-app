import ErrorHandler from "@/server/middleware/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "@/server/middleware/errorResponse";
import { User } from "@/server/database/model";
import { sendEmail } from "@/utils/sendMail";
import { withProtected } from "@/server/middleware/withProtected";

interface Data {}

async function VerifyOtpHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    await ErrorHandler(PostVerifyOtp, req, res);
  } else {
    res.status(404).json({ message: "Not Fund" });
  }
}

const PostVerifyOtp = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, OTP } = req.body.req_user_data;
  const user = req.body.req_user_data;
  const { otpEntered } = req.body;

  if (!otpEntered)
    return ErrorResponse({ message: "Otp is Required!!" }, 400, res);

  if (OTP != otpEntered)
    return res.status(200).send({
      status: "fail",
      message: "OTP does not Match!!",
    });

  await user.update({ isEmailVerified: true });
  await user.reload();

  res.status(200).send({
    success: true,
    message: "Email Successfully Verified!!",
    response: { user },
  });
};

export default withProtected(VerifyOtpHandler);
