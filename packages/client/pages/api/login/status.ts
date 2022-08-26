// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import { httpGet } from "../../../services/api-service";

type Data = {
  status: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let token = getCookie("token", { req, res }) || <string>req.query.token;

  if (!token) {
    res.status(403).json({ status: "failure", message: "Unauthenticated" });
    return;
  }

  try {
    const { status } = await httpGet(
      `${process.env.SERVER_HOST}/api/login/status?token=${token || ""}`
    );

    if (status && status === "success") {
      res.status(200).json({ status });
    } else {
      throw Error();
    }
  } catch (error) {
    res.status(403).json({ status: "failure", message: "Server error" });
  }
}
