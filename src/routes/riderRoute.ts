import { Router } from 'express';
import {
  createRider,
  verifyRider,
  forgetPassword,
  resendVerificationLink,
  resetPassword,
  getAllRider,
  getRider,
} from '../controllers/riderController';
import { loginUser } from '../controllers/users';
// import { riderAuth } from '../middleware/riderAuth';

const router = Router();

router.post('/register', createRider);
router.get('/verify/:token', verifyRider);
router.post('/login', loginUser);
router.post('/forget-password', forgetPassword);
router.get('/resend-verification-link', resendVerificationLink);
router.post('/reset-password/:token', resetPassword);
router.get('/get-all-rider', getAllRider);
router.get('/get-rider/:id', getRider);

export default router;
