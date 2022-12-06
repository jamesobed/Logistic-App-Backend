import { Router } from 'express';
import {
  createClient,
  verifyClient,
  forgetPassword,
  resendVerificationLink,
  resetPassword,
  getAllClient,
  getClient,
} from '../controllers/clientController';

const router = Router();

router.post('/register', createClient);
router.get('/verify/:token', verifyClient);
router.post('/forget-password', forgetPassword);
router.get('/resend-verification-link', resendVerificationLink);
router.post('/reset-password/:token', resetPassword);
router.get('/get-all-client', getAllClient);
router.get('/get-client/:id', getClient);

export default router;
