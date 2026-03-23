import prisma from '../config/db.js';

export async function createUser(data) {
  try {
    //create new user with email and omit password
    const newUser = await prisma.user.create({
      data,
      omit: { password: true },
    });
    return newUser;
  } catch (error) {
    if (error.code === 'P2002') {
      //throws conflict error if email is used
      const err = new Error('Email has already been used');
      err.status = 409;
      throw err;
    }
    //throws original error
    throw error;
  }
}

export async function findUserByEmail(email) {
  //find user who email matches the field
  return prisma.user.findUnique({ where: { email } });
}

export async function findAllUsers() {
  //retrieve all users except password
  return prisma.user.findMany({ omit: { password: true } });
}

export async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    omit: { password: true },
  });
}

export async function updateUser(id, updateData) {
  try {
    return await prisma.user.update({
      where: { id },
      data: updateData,
      omit: { password: true },
    });
  } catch (error) {
    if (error.code === 'P2025') return null;
    if (error.code === 'P2002') {
      const err = new Error('Email is already in use.');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function findPostByUserId(userId) {
  return await prisma.post.findMany({ where: { authorId: userId } });
}
