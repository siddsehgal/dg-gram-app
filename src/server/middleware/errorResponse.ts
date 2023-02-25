import { NextApiResponse } from "next";

export default function ErrorResponse(
  obj: any,
  statusCode: number,
  res: NextApiResponse<any>
) {
  res.status(statusCode).json({
    success: false,
    ...obj,
  });
}
