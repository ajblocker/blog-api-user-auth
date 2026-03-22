import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../repositories/userRepo.js';

//take email and password from controller layer
export async function signUp(email, password) {
  //hash password (plain text, salt round)
  const hashedPassword = await bcrypt.hash(password, 10);
  //call repo layer with secure password
  const newUser = await createUser({ email, password: hashedPassword });
  return newUser;
}

//verify user credentials
export async function logIn(email, password) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
  const error = new Error('Invalid credentials');
  error.status = 401;
  //call repo function to retrieve user by email
  const user = await findUserByEmail(email);
  //if users email doesn't match, throw error
  if (!user) throw error;

  //compare passwords if email exists
  const match = await bcrypt.compare(password, user.password);
  //if passwords doesn't match, throw error
  if (!match) throw error;

  //if credentials are valid, generate token
  const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  //send token to controller
  return accessToken;
}
