import express from 'express';
import { logInLimiter } from '../middleware/rateLimiter.js';
import { signUpHandler, logInHandler } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signUpHandler);
router.post('/login', logInLimiter, logInHandler);

export default router;
