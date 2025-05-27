import { Request, Response, NextFunction } from "express";
import { auth } from "../middlewares/auth";
import { fromNodeHeaders } from "better-auth/node";

const UsersController = async (
  req: Request,
  res: Response,
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
};
export default UsersController;

export const getUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    return res.json(session.user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
