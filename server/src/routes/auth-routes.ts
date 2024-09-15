import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  })
  if (!user) {return res.status(401).json({message: 'Authentication failed'})}

  const pwValid = await bcrypt.compare(req.body.password, user.password)

  if (!pwValid) {return res.status(401).json({message: 'Authentication failed'})}

  const secretKey = process.env.JWT_SECRET_KEY || ''

  const token = jwt.sign({username: user.username}, secretKey, {expiresIn: '1h'})

  return res.status(200).json({token: token})
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
