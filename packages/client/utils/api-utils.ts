import { NextApiRequest, NextApiResponse } from "next";

export const checkValidMethod = (
  method: string,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== method) {
    res.status(403).json({ message: `Invalid method, should be a ${method}` });
    return false;
  }

  return true;
};
