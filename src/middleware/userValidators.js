import { param, body, oneOf, query } from 'express-validator';

export const validateSignUp = [
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter a valid email address')
    .trim()
    .normalizeEmail(),

  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 3 })
    .withMessage('Password must be at least 3 characters long')
    .isLength({ max: 64 })
    .withMessage('Password cannot be greater than 64 characters'),

  body('role')
    .optional()
    .isIn(['ADMIN', 'USER'])
    .withMessage('Role must be either admin or user'),
];
