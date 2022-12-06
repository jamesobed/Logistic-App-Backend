/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { DispatchRiderInstance } from '../models/dispatchRider';
import { DispatchClientInstance } from '../models/dispactClient';
import { options, loginSchema } from '../utils/utils';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const usertoken = process.env.JWT_SECRET || 'secret';

export async function loginUser(req: Request | any, res: Response) {
  try {
    const { email, password } = req.body;
    const validInput = await loginSchema.validate(req.body, options);

    if (validInput.error) {
      return res.status(401).json({ error: validInput.error.details[0].message });
    }
    // check if rider or client is logging in
    const rider = await DispatchRiderInstance.findOne({
      where: {
        email,
      },
    });

    const client = await DispatchClientInstance.findOne({
      where: {
        email,
      },
    });

    if (!rider && !client) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    if (rider && rider.isVerified) {
      const validPassword = await bcrypt.compare(password, rider.password);

      if (!validPassword) {
        return res.status(401).json({
          error: 'Invalid password',
        });
      }

      const token = jwt.sign({ id: rider.id }, usertoken, { expiresIn: '30mins' });

      return res.status(200).json({
        message: 'Successfully logged in',
        record: {
          id: rider.id,
          token,
          rider,
        },
      });
    }

    if (client && client.isVerified) {
      const validPassword = await bcrypt.compare(password, client.password);

      if (!validPassword) {
        return res.status(401).json({
          error: 'Invalid password',
        });
      }

      const token = jwt.sign({ id: client.id }, usertoken, { expiresIn: '30mins' });

      return res.status(200).json({
        message: 'Successfully logged in',
        record: {
          id: client.id,
          token,
          client,
        },
      });
    }

    return res.status(401).json({
      error: 'User not verified',
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Failed to login user, error try again later',
    });
  }
}
