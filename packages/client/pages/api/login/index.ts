import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(403).json({ message: "Invalid method, should be a POST" });
  } else {
    res.status(200).json({ message: "John Doe" });
  }
}
