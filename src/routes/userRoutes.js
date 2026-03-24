import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import {
  deleteUserByIdHandler,
  getAllUsersHandler,
  getEmailByIdHandler,
  getMyPostsHandler,
  updateUserByIdHandler,
  updateUserRoleHandler,
} from '../controllers/userController.js';
import { validateUpdateRole } from '../middleware/userValidators.js';

const router = express.Router();

//ensure user is logged in and user is available
//check if role is admin, controller proceeds if all is true
//get all users
router.get('/', authenticate, authorizeRoles('ADMIN'), getAllUsersHandler);
router.get('/me', authenticate, getEmailByIdHandler);
router.put('/me', authenticate, updateUserByIdHandler);
router.delete('/me', authenticate, deleteUserByIdHandler);

router.get('/me/posts', authenticate, getMyPostsHandler);
router.patch(
  '/:id/role',
  authenticate,
  authorizeRoles('ADMIN'),
  validateUpdateRole,
  updateUserRoleHandler,
);

export default router;
