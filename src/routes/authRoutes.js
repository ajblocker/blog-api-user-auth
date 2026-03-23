import express from 'express';
import { logInLimiter } from '../middleware/rateLimiter.js';
import { signUpHandler, logInHandler } from '../controllers/authController.js';
import { validateSignUp, validateLogIn } from '../middleware/userValidators.js';

const router = express.Router();

router.post('/signup', validateSignUp, signUpHandler);
router.post('/login', validateLogIn, logInLimiter, logInHandler);

export default router;
