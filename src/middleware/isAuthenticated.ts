import { Request, Response, NextFunction } from "express-serve-static-core";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default requireAuth;
