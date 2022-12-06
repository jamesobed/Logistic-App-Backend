import { Router } from 'express';

import { loginUser } from '../controllers/users';
// import { riderAuth } from '../middleware/riderAuth';

const router = Router();

router.post('/login', loginUser);

export default router;
