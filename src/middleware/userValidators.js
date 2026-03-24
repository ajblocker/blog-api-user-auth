import { param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateSignUp = [
  body('email')
    .exists()
    .trim()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter a valid email address')
    .normalizeEmail(),

  body('password')
    .exists()
    .trim()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 64 })
    .withMessage(
      'Password must contain at least 8 characters and at most 64 characters',
    ),

  body('role')
    .optional()
    .isIn(['ADMIN', 'USER'])
    .withMessage('Role must be either admin or user'),

  handleValidationErrors,
];

export const validateLogIn = [
  body('email').exists().trim().isEmail().withMessage('Email is required'),

  body('password')
    .exists()
    .trim()
    .isLength({ min: 8, max: 64 })
    .withMessage('Password is required'),

  handleValidationErrors,
];

export const validateUpdateRole = [
  body('role')
    .exists()
    .withMessage('Role is required')
    .isIn(['ADMIN', 'USER'])
    .withMessage('Role must be an ADMIN or USER'),

  handleValidationErrors,
];
