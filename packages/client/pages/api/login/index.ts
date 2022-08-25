import type { NextApiRequest, NextApiResponse } from "next";
import { httpPost } from "../../../services/api-service";

type Data = {
  message: string;
  status?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(403).json({ message: "Invalid method, should be a POST" });
  } else {
    const data = await httpPost(
      `${process.env.SERVER_HOST}/api/login`,
      req.body
    );

    if (data?.status === "success") {
      res.setHeader("Set-Cookie", [`token=${data.token}; path=/; HttpOnly`]);
      res.status(200).json({
        message: "Login success",
        status: data.status
      });
    } else {
      res.status(403).json({ message: "Error occurred", status: data?.status });
    }
  }
}
