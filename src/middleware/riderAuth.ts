import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRETE as string;
import { DispatchRiderInstance } from '../models/dispatchRider';

export async function riderAuth(req: Request | any, res: Response, next: NextFunction): Promise<unknown> {
  try {
    const authorization: string = req.headers.authorization.split(' ')[1];

    if (!authorization) {
      return res.status(401).json({
        error: 'Please sign in',
      });
    }
    const token = authorization;

    const verified = jwt.verify(token, secret);
    console.log(verified);

    if (!verified) {
      return res.status(401).json({
        error: 'User not verified, access denied',
      });
    }

    const { id } = verified as { [key: string]: string };

    const user = await DispatchRiderInstance.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        error: 'User not verified',
      });
    }
    req.user = id;
    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: 'User not logged in',
    });
  }
}
