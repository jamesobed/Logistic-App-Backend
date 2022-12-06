/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DispatchRiderInstance } from '../models/dispatchRider';
import { riderSchema, options } from '../utils/utils';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendMails from '../email/sendMail';

const usertoken = process.env.JWT_SECRET || 'secret';

export async function createRider(req: Request, res: Response): Promise<unknown> {
  try {
    const iD = uuidv4();
    const validateResult = riderSchema.validate(req.body, options);

    if (validateResult.error) {
      return res.status(400).json({
        error: validateResult.error.details[0].message,
      });
    }

    const duplicateEmail = await DispatchRiderInstance.findOne({
      where: { email: req.body.email },
    });
    if (duplicateEmail) {
      return res.status(409).json({
        error: 'Email already exists, use another email',
      });
    }

    const duplicatePhoneNumber = await DispatchRiderInstance.findOne({
      where: {
        phoneNumber: req.body.phoneNumber,
      },
    });

    if (duplicatePhoneNumber) {
      return res.status(409).json({
        error: 'Phone number already exists, use another phone number',
      });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 8);
    const token = jwt.sign({ id: iD }, usertoken, { expiresIn: '30mins' });
    const rider = await DispatchRiderInstance.create({
      id: iD,
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      phoneNumber: req.body.phoneNumber,
      city: req.body.city,
      bikeDocument: req.body.bikeDocument,
      validId: req.body.validId,
      avatar: '',
      isVerified: false,
      role: 'rider',
      token,
    });

    sendMails.verifyUserEmail(rider.email, token);

    return res.status(201).json({
      message: 'Successfully created a user',
      record: {
        id: rider.id,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error, try again later',
    });
  }
}
export async function verifyRider(req: Request, res: Response): Promise<unknown> {
  try {
    const { token } = req.params;

    const verified = jwt.verify(token, usertoken);

    const { id } = verified as { [key: string]: string };

    const record = await DispatchRiderInstance.findOne({
      where: {
        id: id,
      },
    });

    if (!record) {
      return res.status(404).json({
        error: 'User not found',
      });
    }
    await record?.update({
      isVerified: true,
    });

    return res.status(302).redirect(`${process.env.APP_URL}/user/login`);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error try again later',
    });
  }
}

// reset password
export async function forgetPassword(req: Request, res: Response): Promise<unknown> {
  try {
    const { email } = req.body;

    const record = await DispatchRiderInstance.findOne({
      where: {
        email,
      },
    });

    if (!record) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    const token = jwt.sign({ id: record.id }, usertoken, { expiresIn: '1d' });

    await record?.update({
      token: token,
    });

    sendMails.verifyUserEmail(record.email, token);

    return res.status(200).json({
      message: 'Check your email for password reset link',
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error try again later',
    });
  }
}

export async function resetPassword(req: Request, res: Response): Promise<unknown> {
  try {
    const { token } = req.params;

    const verified = jwt.verify(token, usertoken);

    const { id } = verified as { [key: string]: string };

    const record = await DispatchRiderInstance.findOne({
      where: {
        id: id,
      },
    });

    if (!record) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 8);

    await record?.update({
      password: hashPassword,
      token: '',
    });

    return res.status(200).json({
      message: 'Password updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error try again later',
    });
  }
}

// resend verification link
export async function resendVerificationLink(req: Request, res: Response): Promise<unknown> {
  try {
    const { email } = req.body;

    const record = await DispatchRiderInstance.findOne({
      where: {
        email,
      },
    });

    if (!record) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    const token = jwt.sign({ id: record.id }, usertoken, { expiresIn: '1d' });

    await record?.update({
      token,
    });

    // check if user is verified
    if (record.isVerified) {
      return res.status(200).json({
        message: 'User already verified',
      });
    }

    sendMails.verifyUserEmail(record.email, token);
    return res.status(200).json({
      message: 'Check your email for verification link',
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error try again later',
    });
  }
}

// get all client
export async function getAllRider(req: Request, res: Response): Promise<unknown> {
  try {
    const record = await DispatchRiderInstance.findAll();

    return res.status(200).json({
      record,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error try again later',
    });
  }
}

// get a client
export async function getRider(req: Request, res: Response): Promise<unknown> {
  try {
    const { id } = req.params;

    const record = await DispatchRiderInstance.findOne({
      where: {
        id,
      },
    });

    if (!record) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    return res.status(200).json({
      record,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error try again later',
    });
  }
}
