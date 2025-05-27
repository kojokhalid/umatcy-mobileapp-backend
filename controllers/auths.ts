import { Request, Response, NextFunction } from "express";
import { auth } from "../middlewares/auth";
import { fromNodeHeaders } from "better-auth/node";

const SignUp = async (req: Request, res: Response, next: NextFunction) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  return res.json(session);
};
const SignIn = async (req: Request, res: Response, next: NextFunction) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  return res.json(session);
};
export { SignUp, SignIn };
