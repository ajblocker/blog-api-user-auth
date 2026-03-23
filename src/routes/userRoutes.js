import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import {
  deleteUserByIdHandler,
  getAllUsersHandler,
  getEmailByIdHandler,
  updateUserByIdHandler,
} from '../controllers/userController.js';

const router = express.Router();

//ensure user is logged in and user is available
//check if role is admin, controller proceeds if all is true
router.get('/', authenticate, authorizeRoles('ADMIN'), getAllUsersHandler);

router.get('/me', authenticate, getEmailByIdHandler);
router.put('/me', authenticate, updateUserByIdHandler);
router.delete('/me', authenticate, deleteUserByIdHandler);

export default router;

//create app.use/api/me in server.js

//routes - create route file that references controller for user management
//
