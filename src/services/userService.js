import {
  findAllUsers,
  findPostByUserId,
  findUserById,
  updateUser,
} from '../repositories/userRepo.js';

//call user repo function
export async function getAllUsers() {
  return findAllUsers();
}

export async function getUserById(id) {
  const user = await findUserById(id);
  if (user) return user;
  else {
    const error = new Error(`User ${id} is not found`);
    error.status = 404;
    throw error;
  }
}

export async function updateUserById(id, updateData) {
  const updatedUser = await updateUser(id, updateData);
  if (updatedUser) return updatedUser;
  else {
    const error = new Error(`User ${id} is not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteUserById(id) {
  const result = await deleteUser(id);
  if (result) return;
  {
    const error = new Error(`User ${id} is not found`);
    error.status = 404;
    throw error;
  }
}

export async function getPostByUserId(userId) {
  return findPostByUserId(userId);
}
