import type { NextApiRequest, NextApiResponse } from "next";
import { getCookieValue } from "../../../utils/session";

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
    const resp = await fetch(`${process.env.SERVER_HOST}/api/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: req.body
    });
    const data = await resp.json();

    if (data?.status === "success") {
      res.setHeader("Set-Cookie", [`token=${data.token}; path=/; HttpOnly`]);
      res.status(200).json({
        message: "Login success",
        status: data.success
      });
    } else {
      res.status(403).json({ message: "Error occurred", status: data?.status });
    }
  }
}
