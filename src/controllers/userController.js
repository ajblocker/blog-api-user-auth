import { deleteUser, updateUser } from '../repositories/userRepo.js';
import { getAllUsers, getUserById } from '../services/userService.js';

//handle http request and return users
export async function getAllUsersHandler(req, res) {
  //call service function
  const users = await getAllUsers();
  //send response to client
  res.status(200).json(users);
}

export async function getEmailByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const users = await getUserById(id);
  res.status(200).json(users);
}

export async function updateUserByIdHandler(req, res) {
  const id = parseINt(req.params.id);
  const { email, password } = req.body;
  const updatedUser = await updateUser(id, { email, password });
  res.status(200).json(updatedUser);
}

export async function deleteUserByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteUser(id);
  res.status(204).send();
}
