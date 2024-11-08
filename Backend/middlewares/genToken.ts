import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../db/prisma";
import { Request, Response, NextFunction } from "express";

interface DecodedToken extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
 
    const token = req.cookies.jwt;
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.passKey!) as DecodedToken;
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }else{
        console.log("chuchi");
    }
    console.log(decoded);

  
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, username: true, fullname: true, profilePic: true }
    });

    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }{
        console.log("Nunni");
    }
    console.log(user);

    
     req.user = user;
    
    
    next();
  } catch (error: any) {
    console.error('Error verifying token:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default protectRoute;
