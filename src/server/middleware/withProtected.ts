import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { User } from "../database/model";
import jwt from "jsonwebtoken";
import ErrorResponse from "./errorResponse";

// This function can be marked `async` if using `await` inside
export async function withProtected(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res.status(401).send({
        status: "fail",
        tokenError: true,
        code: 200,
        message: "Unauthenticated, no token found",
      });

    try {
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || "TheSecretKey"
      );
      const { id } = decoded;

      const user = await User.findOne({
        where: { id },
        attributes: [
          "id",
          "full_name",
          "user_name",
          "email",
          "OTP",
          "isEmailVerified",
        ],
      });

      if (!user)
        return ErrorResponse(
          { message: "No User Found!!", tokenError: true },
          401,
          res
        );

      // console.log(req);

      req.body = { ...req.body, req_user_data: user };
      return handler(req, res);
    } catch (error) {
      // console.log(error);

      return ErrorResponse(
        { message: "Invalid Token Provided!!", tokenError: true },
        401,
        res
      );
    }
  };
}
