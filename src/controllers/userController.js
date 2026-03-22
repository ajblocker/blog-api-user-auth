import { getAllUsers } from '../services/userService.js';

//handle http request and return users
export async function getAllUsersHandler(req, res) {
  //call service function
  const users = await getAllUsers();
  //send response to client
  res.status(200).json(users);
}
