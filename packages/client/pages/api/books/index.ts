// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { httpGet } from "../../../services/api-service";
import { Book } from "../../../types";
import { checkValidMethod } from "../../../utils/api-utils";

type Data = {
  status: string;
  data: Book[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (checkValidMethod("GET", req, res)) {
    const resp = await httpGet(`${process.env.SERVER_HOST}/api/books`);
    console.log("resp", resp);
    if (resp.status === "success") {
      res.status(200).json({ status: "success", data: resp.data });
    } else {
      res.status(403).json({ status: "failure", data: [] });
    }
  }
}
