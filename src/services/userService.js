import { findAllUsers } from '../repositories/userRepo.js';

//call user repo function
export async function getAllUsers() {
  return findAllUsers();
}
