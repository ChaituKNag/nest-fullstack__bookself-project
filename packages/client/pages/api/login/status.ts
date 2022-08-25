// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { httpGet } from "../../../services/api-service";
import { getCookieValue } from "../../../utils/session";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = getCookieValue(req.headers.cookie, "token");
  if (!token) {
    res.status(403).json({ name: "" });
  }
  try {
    const isValid = await httpGet(
      `${process.env.SERVER_HOST}/api/login/status?token=${token}`
    );

    res.status(200).json({ name: "John Doe" });
  } catch (error) {
    res.status(403).json({ name: "" });
  }
}
