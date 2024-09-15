import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import { Jwt } from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const secretKey = process.env.JWT_SECRET_KEY || ''

    jwt.verify(token, secretKey, (err, user)=> {
      if (err) {
        return res.sendStatus(401)
      }
      else {
        req.user = user as JwtPayload
        return next()
      }
    })

  }
  else {res.sendStatus(401)}
};
