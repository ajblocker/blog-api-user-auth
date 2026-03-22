import { signUp, logIn } from '../services/authService.js';

export async function signUpHandler(req, res) {
  //extract email and password
  const { email, password } = req.body;
  //call service layer
  const newUser = await signUp(email, password);
  //get new user back
  res.status(201).json(newUser);
}

export async function logInHandler(req, res) {
  //extract data
  const { email, password } = req.body;
  //get the token
  const accessToken = await logIn(email, password);
  //send response
  res.status(200).json({ accessToken });
}
