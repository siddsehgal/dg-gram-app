import { throws } from "assert";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import ErrorResponse from "./errorResponse";

export default async function ErrorHandler(
  func: (req: NextApiRequest, res: NextApiResponse<any>) => Promise<any>,
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const response = await func(req, res);
    return response;
  } catch (error: any) {
    console.error("Error Handler: ", error);
    ErrorResponse(
      { message: "Something went Wrong!!", error: error.message },
      400,
      res
    );
  }
}
