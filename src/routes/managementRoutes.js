import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getEmailByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
} from '../controllers/managementController.js';

const router = express.Router();

router.get('/me', authenticate, getEmailByIdHandler);
router.put('/me', authenticate, updateUserByIdHandler);
router.delete('/me', authenticate, deleteUserByIdHandler);

export default router;
